import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export const MoneyRain: React.FC = () => {
    const isHolding = useRef(false);
    const holdInterval = useRef<number | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    // Tạo các shape từ emoji
    const moneyShapes = useRef<any[]>([]);

    useEffect(() => {
        // Init shapes - Đa dạng hơn, bớt đỏ để "tránh lạm dụng tết"
        const vector1 = (confetti as any).shapeFromText({ text: '💵', scalar: 30 }); // Tiền đô
        const vector2 = (confetti as any).shapeFromText({ text: '💰', scalar: 30 }); // Túi tiền
        const vector3 = (confetti as any).shapeFromText({ text: '💸', scalar: 30 }); // Tiền bay
        const vector4 = (confetti as any).shapeFromText({ text: '🪙', scalar: 30 }); // Xu vàng
        const vector5 = (confetti as any).shapeFromText({ text: '💎', scalar: 30 }); // Kim cương
        const vector6 = (confetti as any).shapeFromText({ text: '🧧', scalar: 25 }); // Lì xì (giảm tỉ lệ/kích thước)

        moneyShapes.current = [vector1, vector2, vector3, vector4, vector5, vector6];

        const handleDown = (e: MouseEvent | TouchEvent) => {
            isHolding.current = true;
            const pos = updateMousePos(e);

            // Cú búng "đầu tiên" khi click: Búng cao, tỏa rộng
            fireBurst(pos.x, pos.y, 40);

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
            const pos = {
                x: clientX / window.innerWidth,
                y: clientY / window.innerHeight
            };
            mousePos.current = pos;
            return pos;
        };

        // Hàm bắn tung tóe (Dùng cho click đầu tiên)
        const fireBurst = (x: number, y: number, count: number) => {
            confetti({
                particleCount: count,
                spread: 120, // Tỏa rộng
                origin: { x, y },
                shapes: moneyShapes.current,
                scalar: 2.2,
                startVelocity: 55, // Búng thật cao
                gravity: 0.6, // Rơi nhẹ nhàng như lá
                drift: Math.random() > 0.5 ? 2 : -2, // Bay lượn một chút
                ticks: 300, // Tồn tại lâu hơn để thấy nó rơi
                zIndex: 9999,
                colors: ['#FFD700', '#C0C0C0', '#4CAF50'] // Vàng, Bạc, Xanh lá (tiền)
            });
        };

        // Hàm bắn nhẹ khi hold (Duy trì hiệu ứng)
        const fireConfetti = () => {
            const { x, y } = mousePos.current;

            confetti({
                particleCount: 2,
                spread: 60,
                origin: { x, y },
                shapes: moneyShapes.current,
                scalar: 2,
                startVelocity: 25,
                gravity: 0.5, // Cực nhẹ
                drift: Math.random() * 4 - 2, // Lắc lư theo gió
                ticks: 200,
                zIndex: 9999,
                colors: ['#FFD700', '#C0C0C0']
            });
        };

        const startLoop = () => {
            if (holdInterval.current) return;
            holdInterval.current = window.setInterval(fireConfetti, 100); // Giãn cách ra để không bị rối
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

    return null;
};
