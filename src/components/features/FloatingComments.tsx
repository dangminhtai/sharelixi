import React, { useEffect, useState } from 'react';

// Define the interface for a comment
interface Comment {
    id: number;
    emoji: string;
    text: string;
    delay: number; // ms delay before showing
}

// Data for the comments
const COMMENTS_DATA: Comment[] = [
    { id: 1, emoji: '😆', text: 'Trang này dễ thương xỉu!', delay: 500 },
    { id: 2, emoji: '🧧', text: 'Đã lì xì lấy may nha', delay: 2500 },
    { id: 3, emoji: '🚀', text: 'Hóng Tết 2027 quá đi', delay: 5500 },
    { id: 4, emoji: '⭐', text: 'Giao diện xịn sò quá ad ơi', delay: 9000 },
];

export const FloatingComments: React.FC = () => {
    const [visibleComments, setVisibleComments] = useState<number[]>([]);

    useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];

        COMMENTS_DATA.forEach((comment) => {
            // Show comment after delay
            const showTimeout = setTimeout(() => {
                setVisibleComments((prev) => [...prev, comment.id]);

                // Auto hide after 10s
                const hideTimeout = setTimeout(() => {
                    setVisibleComments((prev) => prev.filter(id => id !== comment.id));
                }, 10000);
                timeouts.push(hideTimeout);

            }, comment.delay);
            timeouts.push(showTimeout);
        });

        return () => {
            timeouts.forEach((t) => clearTimeout(t));
        };
    }, []);

    return (
        <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3 items-end pointer-events-none max-w-[300px]">
            {COMMENTS_DATA.map((comment) => (
                visibleComments.includes(comment.id) && (
                    <div
                        key={comment.id}
                        className="flex items-center gap-3 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-2xl rounded-tr-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] animate-slide-up origin-bottom-right border border-white/50"
                    >
                        <span className="text-2xl bg-yellow-100 p-1.5 rounded-full shadow-inner">{comment.emoji}</span>
                        <span className="text-sm font-medium leading-tight font-tomorrow">{comment.text}</span>
                    </div>
                )
            ))}
            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
        </div>
    );
};
