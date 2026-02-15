import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

import { BackgroundEffects } from '../features/BackgroundEffects';

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-800 text-yellow-400 overflow-hidden relative">
            <BackgroundEffects />
            <Header />
            <main className="flex-1 w-full max-w-4xl p-4 flex flex-col items-center justify-center z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};
