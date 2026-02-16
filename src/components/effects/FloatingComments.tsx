import React from 'react';

const COMMENTS = [
    { text: "Trang này dễ thương xỉu!", icon: "😆", top: '15%', left: '10%', rotate: '-rotate-2' },
    { text: "Đã lì xì lấy may nha", icon: "🧧", top: '25%', right: '15%', rotate: 'rotate-3' },
    { text: "Uy tín nhé, vừa nhận 10k", icon: "💸", bottom: '20%', left: '15%', rotate: '-rotate-3' },
    { text: "Chơi vui là chính 🤣", icon: "✨", bottom: '30%', right: '10%', rotate: 'rotate-2' },
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
                    // Shape: Chat bubble style (rounded-2xl with sharp bottom-left)
                    className={`absolute bg-white/95 text-gray-800 px-4 py-2 md:px-6 md:py-3 
                    rounded-2xl rounded-bl-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                    flex items-center gap-2 md:gap-3 animate-float border border-white/50 backdrop-blur-sm 
                    cursor-default select-none hover:scale-110 transition-transform duration-300 ${comment.rotate}`}
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
                    <span className="text-xl md:text-3xl drop-shadow-sm filter">{comment.icon}</span>
                    <span className="text-xs md:text-sm font-bold tracking-wide text-gray-700 whitespace-nowrap font-tomorrow">
                        {comment.text}
                    </span>
                </div>
            ))}
        </div>
    );
};
