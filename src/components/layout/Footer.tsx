export const Footer = () => {
    return (
        <footer
            className="w-full p-4 pb-8 text-center z-10 relative mt-auto"
            style={{ paddingBottom: 'calc(32px + env(safe-area-inset-bottom))' }}
        >
            <p className="text-tet-cream/80 font-medium tracking-wide drop-shadow-sm" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
                © Đặng Minh Tài - Chúc mừng năm mới 🧧
            </p>
        </footer>
    );
};
