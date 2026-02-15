import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-2 rounded-full font-bold transition-transform transform hover:scale-105 active:scale-95 shadow-lg border-2";

    const variants = {
        primary: "bg-yellow-500 text-red-900 border-yellow-300 hover:bg-yellow-400",
        secondary: "bg-red-700 text-yellow-300 border-red-500 hover:bg-red-600",
        danger: "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        />
    );
};
