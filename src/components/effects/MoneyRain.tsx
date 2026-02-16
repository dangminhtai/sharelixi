import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export const MoneyRain: React.FC = () => {
    const isHolding = useRef(false);
    const holdInterval = useRef<number | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    // Tạo các shape từ emoji (chỉ cần tạo 1 lần)
    const moneyShapes = useRef<any[]>([]);

    useEffect(() => {
        // Init shapes - TĂNG KÍCH THƯỚC (Scalar)
        const vector1 = (confetti as any).shapeFromText({ text: '🧧', scalar: 30 });
        const vector2 = (confetti as any).shapeFromText({ text: '💰', scalar: 30 });
        const vector3 = (confetti as any).shapeFromText({ text: '💸', scalar: 30 });
        const vector4 = (confetti as any).shapeFromText({ text: '🪙', scalar: 30 });
        moneyShapes.current = [vector1, vector2, vector3, vector4];

        const handleDown = (e: MouseEvent | TouchEvent) => {
            isHolding.current = true;
            updateMousePos(e);
            fireConfetti(); // Fire once immediately
            startLoop();
        };

        const handleUp = () => {
            isHolding.current = false;
            stopLoop();
        };

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (isHolding.current) {
                updateMousePos(e);
            }
        };

        const updateMousePos = (e: MouseEvent | TouchEvent) => {
            let clientX, clientY;
            if (e instanceof MouseEvent) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }
            mousePos.current = {
                x: clientX / window.innerWidth,
                y: clientY / window.innerHeight
            };
        };

        const fireConfetti = () => {
            const { x, y } = mousePos.current;

            // Random Emoji confetti - TĂNG KÍCH THƯỚC
            confetti({
                particleCount: 3, // Ít hạt mỗi lần bắn để mượt khi hold
                spread: 30,
                origin: { x, y },
                shapes: moneyShapes.current,
                scalar: 2.5, // Kích thước hiển thị (Scale up)
                startVelocity: 15, // Bay lên một chút
                drift: 0,
                ticks: 100,
                zIndex: 9999, // Trên cùng
                colors: ['#FFD700', '#D00000'] // Gold & Red fallback
            });

            // Thêm confetti thường (mảnh giấy vàng đỏ) cho đẹp - TĂNG KÍCH THƯỚC
            confetti({
                particleCount: 5,
                spread: 40,
                origin: { x, y },
                colors: ['#FFD700', '#FF0000'], // Gold & Red
                startVelocity: 10,
                gravity: 1.2,
                scalar: 1.2, // To hơn chút (0.8 -> 1.2)
                zIndex: 9998
            });
        };

        const startLoop = () => {
            if (holdInterval.current) return;
            // Dùng setInterval thay vì requestAnimationFrame để kiểm soát mật độ (tránh quá dày)
            holdInterval.current = window.setInterval(fireConfetti, 50);
        };

        const stopLoop = () => {
            if (holdInterval.current) {
                clearInterval(holdInterval.current);
                holdInterval.current = null;
            }
        };

        // Attach global listeners
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('mousemove', handleMove);

        window.addEventListener('touchstart', handleDown);
        window.addEventListener('touchend', handleUp);
        window.addEventListener('touchmove', handleMove);

        return () => {
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('mousemove', handleMove);

            window.removeEventListener('touchstart', handleDown);
            window.removeEventListener('touchend', handleUp);
            window.removeEventListener('touchmove', handleMove);
            stopLoop();
        };
    }, []);

    return null; // Component không render UI gì cả, chỉ xử lý logic effect
};
