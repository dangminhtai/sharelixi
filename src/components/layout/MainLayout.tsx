import React from 'react';
import { FloatingComments } from '@/components/layout/FloatingComments';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
            <FloatingComments />
            {/* Background Bubbles from Template */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-tet-red rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse-slow"></div>
            </div>

            <Header />
            <main className="flex-1 w-full flex flex-col items-center justify-start z-10 relative pt-24 pb-16 px-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};
