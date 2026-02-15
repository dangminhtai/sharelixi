import { useEffect, useState } from 'react';

export const BackgroundEffects = () => {
    const [petals, setPetals] = useState<number[]>([]);

    useEffect(() => {
        // Determine number of petals based on screen width/density
        const petalCount = 30;
        const newPetals = Array.from({ length: petalCount }, (_, i) => i);
        setPetals(newPetals);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {petals.map((i) => (
                <div
                    key={i}
                    className="absolute animate-fall"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-5%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${10 + Math.random() * 10}s`,
                        opacity: 0.7,
                    }}
                >
                    {/* Simple SVG Cherry Blossom Petal */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="pink" style={{ transform: `rotate(${Math.random() * 360}deg)` }}>
                        <path d="M12 2C12 2 14 6 18 6C22 6 22 10 22 10C22 10 18 10 16 14C14 18 12 22 12 22C12 22 10 18 8 14C6 10 2 10 2 10C2 10 6 10 6 6C10 6 12 2 12 2Z" />
                    </svg>
                </div>
            ))}
        </div>
    );
};
