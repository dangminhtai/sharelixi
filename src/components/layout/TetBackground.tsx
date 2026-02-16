import React from 'react';

export const TetBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 1. Khung viền lớn */}
            <div className="absolute inset-2 md:inset-6 border border-tet-gold/30 rounded-3xl opacity-80">
                {/* Góc trang trí */}
                <div className="absolute -top-[1px] -left-[1px] w-8 h-8 md:w-16 md:h-16 border-t-2 border-l-2 border-tet-gold rounded-tl-3xl"></div>
                <div className="absolute -top-[1px] -right-[1px] w-8 h-8 md:w-16 md:h-16 border-t-2 border-r-2 border-tet-gold rounded-tr-3xl"></div>
                <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 md:w-16 md:h-16 border-b-2 border-l-2 border-tet-gold rounded-bl-3xl"></div>
                <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 md:w-16 md:h-16 border-b-2 border-r-2 border-tet-gold rounded-br-3xl"></div>

                {/* Các chấm tròn nhỏ ở góc trong */}
                <div className="absolute top-4 left-4 w-1 h-1 bg-tet-gold rounded-full opacity-50"></div>
                <div className="absolute top-4 right-4 w-1 h-1 bg-tet-gold rounded-full opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-tet-gold rounded-full opacity-50"></div>
                <div className="absolute bottom-4 right-4 w-1 h-1 bg-tet-gold rounded-full opacity-50"></div>
            </div>

            {/* 2. Dây treo trang trí (Trên xuống) */}
            <div className="absolute top-0 left-0 w-full h-1/3 flex justify-around px-10 opacity-60">
                {/* Dây 1 */}
                <div className="hidden md:flex flex-col items-center h-40 animate-sway origin-top" style={{ animationDelay: '0s' }}>
                    <div className="w-[1px] h-24 bg-tet-gold/50"></div>
                    <OrnamentIcon />
                </div>

                {/* Dây 2 (Giữa - Dài hơn) */}
                <div className="flex flex-col items-center h-56 animate-sway origin-top" style={{ animationDelay: '1s' }}>
                    <div className="w-[1px] h-32 bg-tet-gold/50"></div>
                    <OrnamentIconLarge />
                </div>

                {/* Dây 3 */}
                <div className="hidden md:flex flex-col items-center h-40 animate-sway origin-top" style={{ animationDelay: '0.5s' }}>
                    <div className="w-[1px] h-24 bg-tet-gold/50"></div>
                    <OrnamentIcon />
                </div>
            </div>

            {/* 3. Cây cối và Quà (Dưới lên) - Line Art */}
            <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex justify-between items-end px-4 md:px-20 opacity-40">

                {/* Cụm trái: Cây to + Cây nhỏ + Quà */}
                <div className="flex items-end gap-2 md:gap-4">
                    <PineTree className="w-16 h-24 md:w-24 md:h-36 text-tet-gold" />
                    <PineTree className="w-10 h-16 md:w-16 md:h-24 text-tet-gold -ml-4 md:-ml-8 mb-2" />
                    <GiftBox className="w-8 h-8 md:w-12 md:h-12 text-tet-gold mb-1" />
                </div>

                {/* Cụm phải: Cây to + Ly rượu */}
                <div className="flex items-end gap-2 md:gap-4">
                    <WineGlass className="hidden md:block w-8 h-12 text-tet-gold mb-2" />
                    <GiftBox className="w-10 h-10 md:w-14 md:h-14 text-tet-gold mb-1" />
                    <PineTree className="w-20 h-28 md:w-28 md:h-40 text-tet-gold" />
                </div>
            </div>

            {/* Pattern nền mờ (Lưới) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-[-1]"></div>
        </div>
    );
};

// --- SVG Components ---

const OrnamentIcon: React.FC = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="#FCD34D" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" stroke="#FCD34D" strokeWidth="1" />
        <path d="M20 2V38" stroke="#FCD34D" strokeWidth="0.5" />
        <path d="M2 20H38" stroke="#FCD34D" strokeWidth="0.5" />
    </svg>
);

const OrnamentIconLarge: React.FC = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" stroke="#FCD34D" strokeWidth="1.5" />
        <path d="M30 10L35 20H25L30 10Z" fill="none" stroke="#FCD34D" /> {/* Star-like shape */}
        <rect x="20" y="20" width="20" height="20" stroke="#FCD34D" transform="rotate(45 30 30)" />
        <circle cx="30" cy="30" r="5" fill="#FCD34D" />
    </svg>
);

const PineTree: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tán cây - Các tam giác chồng lên nhau */}
        <path d="M50 10L10 60H90L50 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 35L15 90H85L50 35Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 65L20 120H80L50 65Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        {/* Đường kẻ dọc trang trí */}
        <path d="M50 10V120" stroke="currentColor" strokeWidth="1" />
        {/* Gốc cây */}
        <rect x="45" y="120" width="10" height="30" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="150" x2="60" y2="150" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const GiftBox: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="15" width="40" height="30" stroke="currentColor" strokeWidth="2" />
        <rect x="2" y="10" width="46" height="8" stroke="currentColor" strokeWidth="2" />
        <path d="M25 10V45" stroke="currentColor" strokeWidth="2" />
        {/* Nơ */}
        <path d="M25 10C25 5 20 2 15 5C12 7 15 10 25 10Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M25 10C25 5 30 2 35 5C38 7 35 10 25 10Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const WineGlass: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10C2 10 2 25 15 25C28 25 28 10 28 10" stroke="currentColor" strokeWidth="2" />
        <line x1="15" y1="25" x2="15" y2="45" stroke="currentColor" strokeWidth="2" />
        <line x1="8" y1="45" x2="22" y2="45" stroke="currentColor" strokeWidth="2" />
        <path d="M5 15H25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
);
