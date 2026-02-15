export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-tet-gold drop-shadow-lg flex items-center gap-2">
                <span>🌸</span>
                <span className="tracking-tighter">Xuân 2026</span>
                <span>🐴</span>
            </div>
            <nav>
                {/* Navigation items can go here */}
            </nav>
        </header>
    );
};
