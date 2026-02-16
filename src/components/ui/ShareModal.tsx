import React, { useState } from 'react';
import { X, Facebook, Send, Link as LinkIcon, Download, Mail, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        text: string;
        url: string;
    };
    targetId: string; // ID of the element to capture
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data, targetId }) => {
    const [isCapturing, setIsCapturing] = useState(false);

    if (!isOpen) return null;

    const handleFacebookShare = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}&quote=${encodeURIComponent(data.text)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
    };

    const handleMessengerShare = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = `fb-messenger://share?link=${encodeURIComponent(data.url)}`;
        } else {
            alert("Trên máy tính, bạn hãy copy link và gửi qua Messenger nhé!");
        }
    };

    const handleZaloShare = () => {
        navigator.clipboard.writeText(`${data.text} ${data.url}`);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = "zalo://";
        } else {
            window.open("https://chat.zalo.me/", '_blank');
        }
        alert("Đã copy nội dung! Hãy dán vào Zalo để khoe ngay nhé.");
    };

    const handleEmailShare = () => {
        const subject = "Khoe lì xì Tết 2026 nè!";
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(data.text + "\n\n" + data.url)}`;
        window.location.href = mailtoUrl;
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${data.text} ${data.url}`);
        alert("Đã copy vào bộ nhớ tạm!");
    };

    const handleDownloadImage = async () => {
        const element = document.getElementById(targetId);
        if (!element) {
            alert("Không tìm thấy ảnh để tải!");
            return;
        }

        setIsCapturing(true);
        try {
            // Wait a bit for DOM to be ready
            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(element, {
                useCORS: true,
                scale: 2,
                backgroundColor: null,
                logging: false,
                allowTaint: true
            });

            const image = canvas.toDataURL("image/png");

            const link = document.createElement('a');
            link.href = image;
            link.download = `Li-Xi-Tet-2026-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Capture Error:", error);
            alert("Không thể tạo ảnh, vui lòng thử chụp màn hình thủ công.");
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-sm bg-zinc-900 border-t border-zinc-700 md:border md:rounded-2xl p-6 shadow-2xl transform transition-transform duration-300 slide-in-from-bottom-10 md:slide-in-from-bottom-0">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Chia sẻ lộc lá</h3>
                    <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Facebook */}
                    <button onClick={handleFacebookShare} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <Facebook className="w-6 h-6" />
                        </div>
                        <span className="text-xs text-gray-300">Facebook</span>
                    </button>

                    {/* Zalo */}
                    <button onClick={handleZaloShare} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-full bg-[#0068FF] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <span className="font-bold text-sm">Zalo</span>
                        </div>
                        <span className="text-xs text-gray-300">Zalo</span>
                    </button>

                    {/* Messenger */}
                    <button onClick={handleMessengerShare} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00B2FF] to-[#006AFF] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <Send className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-gray-300">Messenger</span>
                    </button>

                    {/* Email */}
                    <button onClick={handleEmailShare} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-gray-300">Email</span>
                    </button>

                    {/* Download Image */}
                    <button
                        onClick={handleDownloadImage}
                        disabled={isCapturing}
                        className="flex flex-col items-center gap-2 group disabled:opacity-50"
                    >
                        <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            {isCapturing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                        </div>
                        <span className="text-xs text-gray-300">
                            {isCapturing ? 'Đang tạo...' : 'Tải Ảnh'}
                        </span>
                    </button>

                    {/* Copy Link */}
                    <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <LinkIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs text-gray-300">Sao chép</span>
                    </button>
                </div>

                <div className="mt-8 text-center text-zinc-500">
                    <p className="text-[10px]">
                        *Lì xì càng to, chia sẻ càng may mắn!
                    </p>
                </div>
            </div>
        </div>
    );
};