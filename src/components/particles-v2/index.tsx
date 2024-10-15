'use client';
import React, { useEffect, useRef } from 'react';

interface ParticleEffectProps {
    particleCount?: number;
    particleColor?: string;
    minParticleSize?: number;
    maxParticleSize?: number;
    minSpeed?: number;
    maxSpeed?: number;
}

class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(canvas: HTMLCanvasElement, color: string, minSize: number, maxSize: number, minSpeed: number, maxSpeed: number) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
        this.speedY = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
        this.color = color;
    }

    update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function ParticleEffect({
    particleCount = 100,
    particleColor = '#ffffff',
    minParticleSize = 1,
    maxParticleSize = 3,
    minSpeed = 0.1,
    maxSpeed = 1
}: ParticleEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas, particleColor, minParticleSize, maxParticleSize, minSpeed, maxSpeed));
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update(canvas);
                particle.draw(ctx);
            });
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animate as unknown as number);
        };
    }, [particleCount, particleColor, minParticleSize, maxParticleSize, minSpeed, maxSpeed]);

    return (
        <canvas
            ref={canvasRef}
            className='fixed inset-0 z-[0]'
        />
    );
}
