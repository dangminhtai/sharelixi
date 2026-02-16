import React from 'react';
import { createPortal } from 'react-dom';

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
        className: "bottom-[15%] left-[5%] md:bottom-[10%] md:left-[5%]",
        rotate: '-rotate-2'
    },
    {
        text: "Đã lì xì lấy may nha",
        icon: "🧧",
        className: "bottom-[20%] right-[5%] md:bottom-[12%] md:right-[5%]",
        rotate: 'rotate-3'
    }
];

export const FloatingComments: React.FC = () => {
    // Use Portal to render outside of root div, directly into body
    // This bypasses any CSS transforms/filters on parent elements that might break 'fixed' positioning
    return createPortal(
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {COMMENTS.map((comment, index) => (
                <div
                    key={index}
                    // Added pointer-events-auto to ensure hover works
                    className={`absolute bg-white/95 text-gray-800 px-4 py-2 md:px-6 md:py-3
                    rounded-2xl rounded-bl-none shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                    flex items-center gap-2 md:gap-3 animate-float border border-white/50 backdrop-blur-sm
                    cursor-default select-none hover:scale-110 transition-transform duration-300 pointer-events-auto
                    ${comment.rotate} ${comment.className}`}
                    style={{
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
        </div>,
        document.body
    );
};
