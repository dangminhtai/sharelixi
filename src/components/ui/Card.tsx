import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl ${className}`}>
            {children}
        </div>
    );
};
