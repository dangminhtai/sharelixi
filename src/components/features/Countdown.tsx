import { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownProps {
    targetDate: string; // ISO string
    onComplete?: () => void;
}

export const Countdown = ({ targetDate, onComplete }: CountdownProps) => {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (
                newTimeLeft.days === 0 &&
                newTimeLeft.hours === 0 &&
                newTimeLeft.minutes === 0 &&
                newTimeLeft.seconds === 0
            ) {
                setIsExpired(true);
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    if (isExpired) {
        return null; // Or return a "Happy New Year" message handled by parent
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-red-900/50 rounded-xl border-2 border-yellow-500 shadow-2xl backdrop-blur-sm animate-pulse">
            <h2 className="text-2xl font-bold text-yellow-300 uppercase tracking-widest">Tết Loading...</h2>
            <div className="flex space-x-4 text-center">
                <TimeUnit value={timeLeft.days} label="Ngày" />
                <TimeUnit value={timeLeft.hours} label="Giờ" />
                <TimeUnit value={timeLeft.minutes} label="Phút" />
                <TimeUnit value={timeLeft.seconds} label="Giây" />
            </div>
        </div>
    );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
        <div className="bg-red-600 text-white text-3xl font-black w-16 h-16 flex items-center justify-center rounded-lg border border-yellow-400 shadow-inner">
            {value < 10 ? `0${value}` : value}
        </div>
        <span className="text-yellow-200 text-sm mt-1 font-medium">{label}</span>
    </div>
);
