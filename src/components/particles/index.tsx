'use client';

import React, { useEffect, useRef } from 'react';
interface ParticleEffectProps {
    particleCount?: number;
    particleColor?: string;
    minParticleSize?: number;
    maxParticleSize?: number;
    minSpeed?: number;
    maxSpeed?: number;
    fadeInDuration?: number; // 渐显动画持续时间参数(毫秒)
}

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    opacity: number; // 透明度属性
    fadeInStart: number; // 开始渐显的时间戳
    fadeInDuration: number; // 渐显持续时间

    constructor(
        canvas: HTMLCanvasElement,
        color: string,
        minSize: number,
        maxSize: number,
        minSpeed: number,
        maxSpeed: number,
        fadeInDuration: number,
        delayIndex: number, // 延迟索引参数
    ) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
        this.speedY = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
        this.color = color;
        this.opacity = 0; // 初始透明度为0
        this.fadeInStart = performance.now() + delayIndex * 20; // 每个粒子延迟20ms开始渐显
        this.fadeInDuration = fadeInDuration;
    }

    update(canvas: HTMLCanvasElement, currentTime: number) {
        // 更新位置
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // 更新透明度
        if (currentTime >= this.fadeInStart) {
            const timePassed = currentTime - this.fadeInStart;
            this.opacity = Math.min(timePassed / this.fadeInDuration, 1);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const [r, g, b] = this.hexToRgb(this.color);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    // 辅助方法：将十六进制颜色转换为RGB
    private hexToRgb(hex: string): [number, number, number] {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return [parseInt(result[1] ?? '0', 16), parseInt(result[2] ?? '0', 16), parseInt(result[3] ?? '0', 16)];
        } else {
            return [255, 255, 255]; // 默认白色
        }
    }
}

export default function ParticleEffect({
    particleCount = 100,
    particleColor = '#ffffff',
    minParticleSize = 1,
    maxParticleSize = 3,
    minSpeed = 0.1,
    maxSpeed = 1,
    fadeInDuration = 2000, // 默认渐显时间为2秒
}: ParticleEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let isCurrentlyDesktop = window.matchMedia('(min-width: 768px)').matches;

        const initializeParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(
                    new Particle(
                        canvas,
                        particleColor,
                        minParticleSize,
                        maxParticleSize,
                        minSpeed,
                        maxSpeed,
                        fadeInDuration,
                        i,
                    ),
                );
            }
        };

        const resizeCanvas = () => {
            const wasDesktop = isCurrentlyDesktop;
            isCurrentlyDesktop = window.matchMedia('(min-width: 768px)').matches;

            if (isCurrentlyDesktop) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                if (!wasDesktop) {
                    // 如果之前不是桌面模式，现在是，则重新初始化粒子
                    initializeParticles();
                    if (!animationFrameRef.current) {
                        animationFrameRef.current = requestAnimationFrame(animate);
                    }
                }
            } else {
                canvas.width = 0;
                canvas.height = 0;
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = undefined;
                }
            }
        };

        const animate = (currentTime: number) => {
            if (!isCurrentlyDesktop) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update(canvas, currentTime);
                particle.draw(ctx);
            });
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleOrientationChange = () => {
            setTimeout(resizeCanvas, 100);
        };
        window.addEventListener('orientationchange', handleOrientationChange);

        if (isCurrentlyDesktop) {
            initializeParticles();
            animationFrameRef.current = requestAnimationFrame(animate);
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('orientationchange', handleOrientationChange);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [particleCount, particleColor, minParticleSize, maxParticleSize, minSpeed, maxSpeed, fadeInDuration]);
    return <canvas ref={canvasRef} className="fixed inset-0 z-[0] hidden md:block" />;
}
