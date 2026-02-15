import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { WHEEL_PRIZES, NEW_YEAR_WISHES } from '../../utils/random';
import type { SpinResult, WheelPrize } from '../../utils/random';
import confetti from 'canvas-confetti';
import { HelpCircle, X, ChevronRight, Share2, CheckCircle2, Lock } from 'lucide-react';

export const LuckyWheel: React.FC = () => {
    const [showRules, setShowRules] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [hasSpun, setHasSpun] = useState(false); // State chặn quay lại
    const [showResultModal, setShowResultModal] = useState(false); // State hiện popup kết quả
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<SpinResult | null>(null);

    // Tính toán số segment
    const segmentAngle = 360 / WHEEL_PRIZES.length;

    const spinWheel = () => {
        if (isSpinning || hasSpun) return;

        setIsSpinning(true);
        setShowResultModal(false);

        // 1. Tính toán giải thưởng dựa trên tỷ lệ
        const random = Math.random() * 100;
        let currentProb = 0;
        let selectedIndex = 0;

        for (let i = 0; i < WHEEL_PRIZES.length; i++) {
            currentProb += WHEEL_PRIZES[i].probability;
            if (random <= currentProb) {
                selectedIndex = i;
                break;
            }
        }

        const selectedPrize = WHEEL_PRIZES[selectedIndex];

        // 2. Tính toán góc quay
        const baseRotation = 1800; // Quay ít nhất 5 vòng
        const targetAngle = 360 - (selectedIndex * segmentAngle);
        const randomOffset = Math.floor(Math.random() * 20) - 10;
        const newRotation = rotation + baseRotation + targetAngle + randomOffset;

        setRotation(newRotation);

        // 3. Xử lý kết quả sau khi quay xong (3s)
        setTimeout(() => {
            setIsSpinning(false);
            setHasSpun(true); // Đánh dấu đã quay rồi
            handleResult(selectedPrize);
        }, 3000);
    };

    const handleResult = (prize: WheelPrize) => {
        let finalValue = 0;
        let message = "";

        if (prize.value === 'SPECIAL') {
            finalValue = Math.floor(Math.random() * (30000 - 20000 + 1)) + 20000;
            finalValue = Math.floor(finalValue / 1000) * 1000;
            const randomWish = NEW_YEAR_WISHES[Math.floor(Math.random() * NEW_YEAR_WISHES.length)];
            message = randomWish;
        } else {
            finalValue = prize.value as number;
            message = "Lộc đầu xuân, cả năm may mắn!";
        }

        setResult({ prize, finalValue, message });
        setShowResultModal(true); // Hiện popup

        // Bắn pháo hoa
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleShare = () => {
        const shareData = {
            title: 'Lì Xì Tết 2026',
            text: `Tôi vừa nhận được lì xì ${result?.finalValue.toLocaleString('vi-VN')} VNĐ cho năm 2026! Đặt gạch ngay!`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            // Fallback copy to clipboard
            navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            alert('Đã copy nội dung khoe tiền vào bộ nhớ tạm!');
        }
    };

    return (
        <Card className="w-full max-w-xl mx-auto overflow-hidden relative border-tet-gold/30 bg-black/40 backdrop-blur-xl pb-8">
            {/* Header nhỏ chứa tiêu đề và nút ? */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-tet-gold uppercase drop-shadow-md flex items-center gap-2">
                    <span className="text-2xl">🎡</span> Vòng Quay 2026
                </h3>
                <button
                    onClick={() => setShowRules(true)}
                    className="flex items-center gap-1 text-xs md:text-sm text-gray-300 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all border border-white/20"
                >
                    <HelpCircle className="w-4 h-4" />
                    <span>Tỷ lệ trúng</span>
                </button>
            </div>

            <div className="flex flex-col items-center gap-8">

                {/* === PHẦN 1: VÒNG QUAY (TRÊN) === */}
                <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] flex-shrink-0 group mx-auto">
                    {/* Kim chỉ */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white drop-shadow-xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>

                    {/* Vòng quay */}
                    <div
                        className={`w-full h-full rounded-full border-[6px] border-tet-gold shadow-[0_0_30px_rgba(255,215,0,0.2)] relative overflow-hidden transition-transform duration-[3000ms] cubic-bezier(0.25, 0.1, 0.25, 1) ${hasSpun ? 'opacity-80 grayscale-[30%]' : ''}`}
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            background: `conic-gradient(
                ${WHEEL_PRIZES.map((p, i) => `${p.color} ${i * (100 / WHEEL_PRIZES.length)}% ${(i + 1) * (100 / WHEEL_PRIZES.length)}%`).join(', ')}
              )`
                        }}
                    >
                        {WHEEL_PRIZES.map((prize, index) => {
                            const rotateAngle = (segmentAngle * index) + (segmentAngle / 2);
                            return (
                                <div
                                    key={prize.id}
                                    className="absolute top-0 left-1/2 w-[1px] h-[50%] origin-bottom flex justify-center pt-4"
                                    style={{ transform: `rotate(${rotateAngle}deg)` }}
                                >
                                    <span
                                        className="whitespace-nowrap font-bold text-sm md:text-lg writing-vertical-rl drop-shadow-sm"
                                        style={{ color: prize.textColor }}
                                    >
                                        {prize.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Logo giữa vòng quay */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-red-700 to-tet-dark border-4 border-tet-gold shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center"
                    >
                        <span className="font-bold text-white text-lg md:text-xl drop-shadow-md">2026</span>
                    </div>
                </div>

                {/* === PHẦN 2: NÚT BẤM (DƯỚI CÙNG) === */}
                <div className="w-full max-w-xs px-4">
                    <button
                        onClick={spinWheel}
                        disabled={isSpinning || hasSpun}
                        className={`
              w-full group relative h-16 rounded-2xl font-black text-xl uppercase tracking-wider shadow-xl transition-all transform
              ${isSpinning || hasSpun
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-red-900 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] active:scale-95'
                            }
            `}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSpinning ? (
                                <>Đang quay...</>
                            ) : hasSpun ? (
                                <>
                                    <Lock className="w-5 h-5" /> Đã Nhận Lộc
                                </>
                            ) : (
                                <>
                                    Hái Lộc Đầu Năm <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                    </button>
                    {hasSpun && (
                        <p className="text-center text-[10px] text-gray-400 mt-2 italic">
                            *Mỗi người chỉ được quay 1 lần (Admin nghèo lắm).
                        </p>
                    )}
                </div>
            </div>

            {/* === MODAL KẾT QUẢ (POPUP) === */}
            {showResultModal && result && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowResultModal(false)}></div>

                    <div className="relative w-full max-w-md bg-gradient-to-b from-red-800 to-tet-dark border-2 border-tet-gold rounded-2xl p-1 shadow-[0_0_50px_rgba(255,215,0,0.3)] overflow-visible">

                        {/* Pháo hoa trang trí góc */}
                        <div className="absolute -top-10 -left-10 text-6xl animate-bounce delay-100">🧨</div>
                        <div className="absolute -bottom-5 -right-5 text-6xl animate-bounce">🧧</div>

                        <div className="bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] bg-opacity-10 w-full h-full rounded-xl p-6 text-center relative z-10">
                            <button
                                onClick={() => setShowResultModal(false)}
                                className="absolute top-2 right-2 text-white/50 hover:text-white p-2"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-xl font-bold text-yellow-200 uppercase mb-1 tracking-widest">
                                Chúc Mừng Năm Mới
                            </h2>
                            <div className="text-[10px] text-gray-300 mb-6 uppercase tracking-[0.3em]">Happy New Year 2026</div>

                            <div className="py-4 my-2 border-t border-b border-white/10 relative">
                                <p className="text-gray-300 text-sm mb-2">Bạn nhận được lì xì ảo trị giá:</p>
                                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm">
                                    {result.finalValue.toLocaleString('vi-VN')}
                                    <span className="text-2xl ml-2 text-yellow-500">đ</span>
                                </div>
                            </div>

                            <div className="mt-6 mb-8 relative">
                                <span className="text-4xl absolute -top-4 -left-2 opacity-20">"</span>
                                <p className="text-white text-lg italic leading-relaxed px-4 font-serif">
                                    {result.message}
                                </p>
                                <span className="text-4xl absolute -bottom-8 -right-2 opacity-20">"</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-transform active:scale-95"
                                >
                                    <Share2 className="w-5 h-5" /> Khoe Ngay
                                </button>
                                <button
                                    onClick={() => setShowResultModal(false)}
                                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors border border-white/20"
                                >
                                    <CheckCircle2 className="w-5 h-5" /> Đóng Lại
                                </button>
                            </div>

                            <p className="text-[10px] text-gray-500 mt-4 italic">
                                *Chụp màn hình làm bằng chứng đòi lì xì Admin năm 2026
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Luật Chơi */}
            {showRules && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-2xl" onClick={() => setShowRules(false)}></div>
                    <div className="relative bg-tet-dark border border-tet-gold p-6 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-tet-gold flex items-center gap-2">
                                <HelpCircle className="w-5 h-5" /> Cơ Cấu Giải Thưởng
                            </h4>
                            <button onClick={() => setShowRules(false)} className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20">
                            <table className="w-full text-xs md:text-sm text-left">
                                <thead className="bg-red-900/50 text-yellow-200">
                                    <tr>
                                        <th className="p-3">Phần thưởng</th>
                                        <th className="p-3 text-center">Tỷ lệ</th>
                                        <th className="p-3 text-right">Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-200">
                                    <tr className="hover:bg-white/5">
                                        <td className="p-3 font-bold text-yellow-100">10.000 VNĐ</td>
                                        <td className="p-3 text-center">19.1%</td>
                                        <td className="p-3 text-right text-gray-400"></td>
                                    </tr>
                                    <tr className="hover:bg-white/5">
                                        <td className="p-3 font-bold text-yellow-100">20.000 VNĐ</td>
                                        <td className="p-3 text-center">45.2%</td>
                                        <td className="p-3 text-right text-gray-400">Dễ trúng</td>
                                    </tr>
                                    <tr className="hover:bg-white/5">
                                        <td className="p-3 font-bold text-yellow-100">50.000 VNĐ</td>
                                        <td className="p-3 text-center">15.3%</td>
                                        <td className="p-3 text-right text-gray-400"></td>
                                    </tr>
                                    <tr className="bg-red-900/20 hover:bg-red-900/30">
                                        <td className="p-3 font-bold text-red-400">100.000 VNĐ</td>
                                        <td className="p-3 text-center text-red-400 font-bold">0.4%</td>
                                        <td className="p-3 text-right text-red-400 font-medium">Siêu hiếm</td>
                                    </tr>
                                    <tr className="bg-purple-900/20 hover:bg-purple-900/30">
                                        <td className="p-3 font-bold text-purple-400">ĐẶC BIỆT</td>
                                        <td className="p-3 text-center font-bold text-purple-400">20.0%</td>
                                        <td className="p-3 text-right text-[10px] leading-tight text-gray-400 max-w-[100px] ml-auto">
                                            20k-30k + Lời chúc
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};
