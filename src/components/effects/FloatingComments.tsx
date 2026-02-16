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
                    // Removed 'hidden' and 'md:flex'. Added pointer-events-auto to ensure interactivity check (hover) implies visibility.
                    // Added 'flex' to always show.
                    className="absolute bg-white/95 text-gray-800 px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-2xl flex items-center gap-2 md:gap-3 animate-float border border-white/50 backdrop-blur-sm cursor-default select-none hover:scale-110 transition-transform duration-300"
                    style={{
                        top: comment.top,
                        left: comment.left,
                        right: comment.right,
                        bottom: comment.bottom,
                        zIndex: 9999,
                        animationDelay: `${index * 1.5}s`,
                        animationDuration: '6s'
                    }}
                >
                    <span className="text-lg md:text-2xl drop-shadow-sm">{comment.icon}</span>
                    <span className="text-[10px] md:text-sm font-bold tracking-wide text-gray-700 whitespace-nowrap">
                        {comment.text}
                    </span>
                </div>
            ))}
        </div>
    );
};
