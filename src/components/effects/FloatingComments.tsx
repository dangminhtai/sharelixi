import React from 'react';

interface CommentStyle {
    text: string;
    icon: string;
    className: string; // Use Tailwind classes for positioning
    rotate: string;
}

const COMMENTS: CommentStyle[] = [
    {
        text: "Trang này dễ thương xỉu!",
        icon: "😆",
        className: "bottom-[15%] left-[5%] md:bottom-[20%] md:left-[10%] lg:bottom-[25%] lg:left-[15%]",
        rotate: '-rotate-2'
    },
    {
        text: "Đã lì xì lấy may nha",
        icon: "🧧",
        className: "bottom-[20%] right-[5%] md:bottom-[30%] md:right-[15%] lg:bottom-[35%] lg:right-[20%]",
        rotate: 'rotate-3'
    },
    {
        text: "Uy tín nhé, vừa nhận 10k",
        icon: "💸",
        className: "bottom-[10%] left-[10%] md:bottom-[15%] md:left-[20%] lg:bottom-[15%] lg:left-[25%]",
        rotate: '-rotate-6'
    },
    {
        text: "Chơi vui là chính 🤣",
        icon: "✨",
        className: "bottom-[25%] right-[10%] md:bottom-[20%] md:right-[5%] lg:bottom-[15%] lg:right-[10%]",
        rotate: 'rotate-6'
    },
];

export const FloatingComments: React.FC = () => {
    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 9999 }}
        >
            {COMMENTS.map((comment, index) => (
                <div
                    key={index}
                    className={`absolute bg-white/95 text-gray-800 px-4 py-2 md:px-6 md:py-3 
                    rounded-2xl rounded-bl-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                    flex items-center gap-2 md:gap-3 animate-float border border-white/50 backdrop-blur-sm 
                    cursor-default select-none hover:scale-110 transition-transform duration-300
                    ${comment.rotate} ${comment.className}`}
                    style={{
                        animationDelay: `${index * 1.5}s`,
                        animationDuration: '6s'
                        // Removed inline top/left/bottom/right to rely on Tailwind classes
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
