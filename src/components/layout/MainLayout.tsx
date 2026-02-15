import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-800 text-yellow-400 overflow-hidden relative">
            <Header />
            <main className="flex-1 w-full max-w-4xl p-4 flex flex-col items-center justify-center z-10">
                {children}
            </main>
            <Footer />
            {/* Background effects will go here */}
        </div>
    );
};
