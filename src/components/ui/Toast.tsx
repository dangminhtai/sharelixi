import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50/10 border-green-500/20 text-green-200';
            case 'error':
                return 'bg-red-50/10 border-red-500/20 text-red-200';
            case 'info':
                return 'bg-blue-50/10 border-blue-500/20 text-blue-200';
        }
    };

    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 min-w-[300px] max-w-sm ${getStyles()}`}>
            {getIcon()}
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
