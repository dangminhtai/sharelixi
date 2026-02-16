import React from 'react';

const COMMENTS = [
    { text: "Trang này dễ thương xỉu!", icon: "😆", top: '15%', left: '10%' },
    { text: "Đã lì xì lấy may nha", icon: "🧧", top: '25%', right: '15%' },
    { text: "Uy tín nhé, vừa nhận 10k", icon: "💸", bottom: '20%', left: '15%' },
    { text: "Chơi vui là chính 🤣", icon: "✨", bottom: '30%', right: '10%' },
];

export const FloatingComments: React.FC = () => {
    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 9999 }} // Force high z-index
        >
            {COMMENTS.map((comment, index) => (
                <div
                    key={index}
                    className="absolute bg-white/95 text-gray-800 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl flex items-center gap-3 animate-float border-2 border-white/50 backdrop-blur-sm cursor-default select-none hover:scale-110 transition-transform duration-300 hidden md:flex"
                    style={{
                        top: comment.top,
                        left: comment.left,
                        right: comment.right,
                        bottom: comment.bottom,
                        animationDelay: `${index * 1.5}s`,
                        animationDuration: '6s'
                    }}
                >
                    <span className="text-xl md:text-2xl drop-shadow-sm">{comment.icon}</span>
                    <span className="text-xs md:text-sm font-bold tracking-wide text-gray-700 whitespace-nowrap">
                        {comment.text}
                    </span>
                </div>
            ))}

            {/* Mobile Specific Comments (Hardcoded for safety) */}
            <div
                className="md:hidden absolute bg-white/95 text-gray-800 px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 animate-float border border-white/50 backdrop-blur-sm"
                style={{ top: '15%', left: '5%', zIndex: 9999, animationDelay: '0s' }}
            >
                <span>😆</span>
                <span className="font-bold text-[10px]">Dễ thương xỉu!</span>
            </div>

            <div
                className="md:hidden absolute bg-white/95 text-gray-800 px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 animate-float border border-white/50 backdrop-blur-sm"
                style={{ top: '20%', right: '5%', zIndex: 9999, animationDelay: '2s' }}
            >
                <span>🧧</span>
                <span className="font-bold text-[10px]">Lì xì lấy may</span>
            </div>
        </div>
    );
};
