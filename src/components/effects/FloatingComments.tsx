import React from 'react';

const COMMENTS = [
    { text: "Trang này dễ thương xỉu!", icon: "😆", position: "top-[15%] left-[5%] md:left-[10%]", rotate: "-rotate-6" },
    { text: "Đã lì xì lấy may nha", icon: "🧧", position: "top-[25%] right-[5%] md:right-[15%]", rotate: "rotate-3" },
    { text: "Uy tín nhé, vừa nhận 10k", icon: "💸", position: "bottom-[20%] left-[8%] md:left-[15%]", rotate: "-rotate-3" },
    { text: "Chơi vui là chính 🤣", icon: "✨", position: "bottom-[30%] right-[3%] md:right-[10%]", rotate: "rotate-6" },
];

export const FloatingComments: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Desktop & Tablet Comments */}
            <div className="hidden md:block h-full w-full relative">
                {COMMENTS.map((comment, index) => (
                    <div
                        key={index}
                        className={`absolute ${comment.position} ${comment.rotate} 
                        bg-white text-gray-800 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl 
                        flex items-center gap-3 animate-float border-2 border-white/50 backdrop-blur-sm
                        hover:scale-110 transition-transform duration-300 select-none cursor-default`}
                        style={{
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
            </div>

            {/* Mobile simplified version - Check top/bottom positions */}
            <div className="md:hidden absolute top-[15%] left-2 animate-float z-50" style={{ animationDelay: '0s' }}>
                <div className="bg-white/90 text-gray-800 px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 -rotate-3 text-[10px] border border-white/50 backdrop-blur-sm">
                    <span>😆</span>
                    <span className="font-bold">Dễ thương xỉu!</span>
                </div>
            </div>

            <div className="md:hidden absolute top-[25%] right-2 animate-float z-50" style={{ animationDelay: '2s' }}>
                <div className="bg-white/90 text-gray-800 px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 rotate-2 text-[10px] border border-white/50 backdrop-blur-sm">
                    <span>🧧</span>
                    <span className="font-bold">Lì xì lấy may</span>
                </div>
            </div>
        </div>
    );
};
