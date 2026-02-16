import React, { useEffect, useRef } from 'react';

interface Petal {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    size: number;
    color: string;
    type: 'round' | 'pointed';
}

export const FallingPetals: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let petals: Petal[] = [];
        const PETAL_COUNT = 20;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createPetal = (y?: number): Petal => {
            const colors = ['#FF99C8', '#FFB7B2', '#FFDAC1', '#FFFFB5']; // Pink, Peach, Light Yellow
            return {
                x: Math.random() * canvas.width,
                y: y ?? -20,
                vx: Math.random() * 2 - 1,   // -1 to 1
                vy: Math.random() * 1 + 1,   // 1 to 2 (speed)
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 2 - 1,
                size: Math.random() * 5 + 5, // 5 to 10
                color: colors[Math.floor(Math.random() * colors.length)],
                type: Math.random() > 0.5 ? 'round' : 'pointed',
            };
        };

        const initPetals = () => {
            petals = [];
            for (let i = 0; i < PETAL_COUNT; i++) {
                petals.push(createPetal(Math.random() * canvas.height));
            }
        };

        const drawPetal = (p: Petal) => {
            if (!ctx) return;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.8;

            ctx.beginPath();
            if (p.type === 'round') {
                // Mai / Dao flower petal (simple circle/oval)
                ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
            } else {
                // More pointed petal
                ctx.moveTo(0, -p.size);
                ctx.bezierCurveTo(p.size, -p.size, p.size, p.size, 0, p.size);
                ctx.bezierCurveTo(-p.size, p.size, -p.size, -p.size, 0, -p.size);
            }
            ctx.fill();
            ctx.restore();
        };

        const update = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            petals.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                // Swaying effect
                p.vx += Math.sin(p.y * 0.01) * 0.002;

                // Reset properly if out of bounds
                if (p.y > canvas.height) {
                    petals[index] = createPetal();
                }
                if (p.x > canvas.width) {
                    p.x = 0;
                } else if (p.x < 0) {
                    p.x = canvas.width;
                }

                drawPetal(p);
            });

            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        initPetals();
        update();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ pointerEvents: 'none' }} // Ensure clicks pass through
        />
    );
};
