import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { PRIZES, getRandomPrize, getSpecialPrizeValue } from '../../utils/random';
import type { Prize } from '../../utils/random';
import { Button } from '../ui/Button';

interface LuckyWheelProps {
    onSpinEnd: (prize: Prize, specialValue?: number) => void;
    canSpin: boolean;
}

export const LuckyWheel = ({ onSpinEnd, canSpin }: LuckyWheelProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const rotationRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        drawWheel(canvas, rotationRef.current);
    }, []);

    const drawWheel = (canvas: HTMLCanvasElement, rotationAngle: number) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2 - 10;
        const arc = (2 * Math.PI) / PRIZES.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw slices
        PRIZES.forEach((prize, i) => {
            const angle = i * arc + rotationAngle;
            ctx.beginPath();
            ctx.fillStyle = prize.color;
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + arc);
            ctx.lineTo(centerX, centerY);
            ctx.fill();
            ctx.stroke();

            // Draw Text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = prize.textColor;
            ctx.font = 'bold 16px Inter';
            ctx.fillText(prize.name, radius - 20, 5);
            ctx.restore();
        });

        // Draw Outer Circle
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FCD34D'; // Yellow-400
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw Center Point (The Arrow)
        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        ctx.fill();

        // Draw Triangle Arrow at the right (0 degrees is usually right in canvas arc)
        // Actually visual arrow should point to the selection.
        // Let's draw a static arrow at the right side pointing left
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.moveTo(canvas.width - 5, centerY);
        ctx.lineTo(canvas.width + 10, centerY - 10);
        ctx.lineTo(canvas.width + 10, centerY + 10);
        ctx.fill();
    };

    const handleSpin = () => {
        if (isSpinning || !canSpin) return;

        setIsSpinning(true);
        const selectedPrize = getRandomPrize();

        // Calculate rotation to stop at the selected prize
        // The arrow is at 0 radians (Right side). 
        // To land on a sector, we need to rotate the wheel such that the sector aligns with 0.
        const selectedIndex = PRIZES.indexOf(selectedPrize);
        const arc = (2 * Math.PI) / PRIZES.length;

        // Calculate the angle of the center of the selected prize
        // Current rotation + Target rotation = Final Position
        // We want the (index * arc) + rotation to effectively align with 0 (or 2PI)
        // Actually simpler: 
        // Target Angle = 360 * spins - (segment_index * arc_angle) - (arc_angle / 2)
        // We add some randomness within the segment? For now center of segment.

        const spinDuration = 5000; // 5s
        const extraSpins = 5; // spins
        const targetRotation =
            rotationRef.current +
            (Math.PI * 2 * extraSpins) +
            (Math.PI * 2 - (selectedIndex * arc)) - (rotationRef.current % (Math.PI * 2));

        // Fine tune landing: center of the slice is at angle + arc/2
        // We want that center to be at 0 (Right).

        const startTime = performance.now();
        const initialRotation = rotationRef.current;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentRotation = initialRotation + (targetRotation - initialRotation) * easeOut;
            rotationRef.current = currentRotation;

            const canvas = canvasRef.current;
            if (canvas) drawWheel(canvas, currentRotation);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsSpinning(false);
                const specialValue = selectedPrize.id === 'special' ? getSpecialPrizeValue() : undefined;
                onSpinEnd(selectedPrize, specialValue);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={300}
                    height={300}
                    className="rounded-full shadow-[0_0_20px_rgba(255,215,0,0.5)] border-4 border-red-600 bg-red-900"
                />
                {/* Needle Marker - Visual Overlay if needed, but we drew it in canvas */}
                <div className="absolute top-1/2 right-[-15px] transform -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[20px] border-r-white pointer-events-none drop-shadow-md"></div>
            </div>

            <Button
                onClick={handleSpin}
                disabled={isSpinning || !canSpin}
                className="mt-8 text-xl px-12 py-4 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSpinning ? 'Đang Quay...' : 'Hái Lộc Ngay 🎁'}
            </Button>
        </div>
    );
};
