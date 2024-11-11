"use client";
import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

interface ProgressiveImageProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    layout?: 'fixed' | 'responsive' | 'fill' | 'intrinsic';
    className?: string;
    style?: React.CSSProperties;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
    src,
    alt = '',
    width,
    height,
    layout = 'responsive',
    className = '',
    style = {},
}) => {
    const [currentSrc, setCurrentSrc] = useState<string>(src);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [blurLevel, setBlurLevel] = useState<number>(20);

    useEffect(() => {
        let isMounted = true;

        const loadImage = async () => {
            try {
                // 加载并压缩原始图片
                const response = await fetch(src);
                const blob = await response.blob();

                // 生成低质量预览图
                const tinyOptions = {
                    maxSizeMB: 0.0002,
                    maxWidthOrHeight: 16,
                    useWebWorker: true,
                    initialQuality: 0.1,
                };

                const tinyBlob = await imageCompression(blob, tinyOptions);
                if (isMounted) {
                    const tinyUrl = URL.createObjectURL(tinyBlob);
                    setCurrentSrc(tinyUrl);
                    // 开始逐渐减小模糊度
                    startSmoothTransition();
                }

                // 加载原始图片
                const highQualityImage = new Image();
                highQualityImage.src = src;
                highQualityImage.onload = () => {
                    if (isMounted) {
                        setCurrentSrc(src);
                        // 当高质量图片加载完成时，继续平滑过渡
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 100);
                    }
                };
            } catch (error) {
                console.error('Error loading image:', error);
                if (isMounted) {
                    setCurrentSrc(src);
                    setIsLoading(false);
                }
            }
        };

        const startSmoothTransition = () => {
            // 从20px的模糊逐渐过渡到10px
            const startBlur = 20;
            const endBlur = 10;
            const duration = 1000; // 1秒
            const steps = 20;
            const stepDuration = duration / steps;
            const blurStep = (startBlur - endBlur) / steps;

            let currentStep = 0;

            const interval = setInterval(() => {
                if (currentStep < steps && isMounted) {
                    setBlurLevel(startBlur - (blurStep * currentStep));
                    currentStep++;
                } else {
                    clearInterval(interval);
                }
            }, stepDuration);
        };

        setIsLoading(true);
        setBlurLevel(20);
        loadImage();

        return () => {
            isMounted = false;
            if (currentSrc && currentSrc.startsWith('blob:')) {
                URL.revokeObjectURL(currentSrc);
            }
        };
    }, [src]);

    const getContainerStyle = (): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            position: 'relative',
            overflow: 'hidden',
        };

        switch (layout) {
            case 'responsive':
                return {
                    ...baseStyle,
                    maxWidth: width || '100%',
                    width: '100%',
                };
            case 'fixed':
                return {
                    ...baseStyle,
                    width: width,
                    height: height,
                };
            case 'fill':
                return {
                    ...baseStyle,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                };
            case 'intrinsic':
                return {
                    ...baseStyle,
                    maxWidth: width,
                    width: '100%',
                };
            default:
                return baseStyle;
        }
    };

    const getImageStyle = (): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            filter: isLoading ? `blur(${blurLevel}px)` : 'none',
            transition: 'filter 0.8s ease-in-out', // 增加过渡时间，使用 ease-in-out
            transform: 'scale(1.1)', // 稍微放大以防止模糊时出现边缘
            ...style,
        };

        switch (layout) {
            case 'responsive':
                return {
                    ...baseStyle,
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                };
            case 'fixed':
                return {
                    ...baseStyle,
                    width: width,
                    height: height,
                };
            case 'fill':
                return {
                    ...baseStyle,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                };
            case 'intrinsic':
                return {
                    ...baseStyle,
                    width: '100%',
                    height: 'auto',
                };
            default:
                return baseStyle;
        }
    };

    return (
        <div className={`${className}`} style={getContainerStyle()}>
            {currentSrc && (
                <img
                    src={currentSrc}
                    alt={alt}
                    style={getImageStyle()}
                />
            )}
        </div>
    );
};
