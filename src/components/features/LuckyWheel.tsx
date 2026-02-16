import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { WHEEL_PRIZES, NEW_YEAR_WISHES } from '../../utils/random';
import type { SpinResult, WheelPrize } from '../../utils/random';
import confetti from 'canvas-confetti';
import { HelpCircle, X, ChevronRight, Share2, CheckCircle2, Lock, Volume2, VolumeX } from 'lucide-react';
import { SpinService } from '../../services/spinService';
import { Howl, Howler } from 'howler';
import html2canvas from 'html2canvas';
import { ShareModal } from '../ui/ShareModal';

// Import sounds
import bgmFile from '../../assets/sounds/bgm.mp3';
import tickFile from '../../assets/sounds/wheel.mp3';
import winFile from '../../assets/sounds/win.mp3';

export const LuckyWheel: React.FC = () => {
    const [showRules, setShowRules] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [hasSpun, setHasSpun] = useState(false); // State chặn quay lại
    const [showResultModal, setShowResultModal] = useState(false); // State hiện popup kết quả
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<SpinResult | null>(null);
    const [userIP, setUserIP] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    // Share Modal State
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareData, setShareData] = useState({ text: '', url: '' });
    const resultRef = useRef<HTMLDivElement>(null);

    // Audio State
    const [soundEnabled, setSoundEnabled] = useState(true);
    const sounds = useRef<{ bgm: Howl; tick: Howl; win: Howl } | null>(null);

    // Init Sounds
    useEffect(() => {
        sounds.current = {
            bgm: new Howl({ src: [bgmFile], loop: true, volume: 0.3, autoplay: true }),
            tick: new Howl({ src: [tickFile], volume: 0.5 }),
            win: new Howl({ src: [winFile], volume: 0.8 }),
        };

        // Auto play bgm interaction
        const unlockAudio = () => {
            if (soundEnabled && sounds.current && !sounds.current.bgm.playing()) {
                sounds.current.bgm.play();
            }
            document.removeEventListener('click', unlockAudio);
        };
        document.addEventListener('click', unlockAudio);

        return () => { // Cleanup
            sounds.current?.bgm.stop();
        };
    }, []);

    // Toggle Sound
    const toggleSound = () => {
        const newState = !soundEnabled;
        setSoundEnabled(newState);
        if (sounds.current) {
            if (newState) {
                sounds.current.bgm.play();
                Howler.mute(false);
            } else {
                sounds.current.bgm.pause();
                Howler.mute(true);
            }
        }
    };

    // 1. Check LocalStorage & IP khi load trang
    useEffect(() => {
        const checkEligibility = async () => {
            const isTestMode = new URLSearchParams(window.location.search).get('test') === '1';

            // Nếu đang test mode
            if (isTestMode) {
                setIsChecking(false);
                return;
            }

            setIsChecking(true);

            // Check LocalStorage trước (Nhanh nhất)
            const savedResult = localStorage.getItem('lixi2026_result');
            if (savedResult) {
                setHasSpun(true);
                setResult(JSON.parse(savedResult));
                setIsChecking(false);
                return;
            }

            // Check IP qua Supabase (Chậm hơn chút)
            const ip = await SpinService.getUserIP();
            if (ip) {
                setUserIP(ip);
                const canSpin = await SpinService.checkCanSpin(ip);
                if (!canSpin) {
                    setHasSpun(true);
                    // Có thể hiển thị thông báo "Bạn đã quay trên thiết bị này rồi" nếu muốn
                }
            }
            setIsChecking(false);
        };

        checkEligibility();
    }, []);

    // Tính toán số segment
    const segmentAngle = 360 / WHEEL_PRIZES.length;

    const spinWheel = async () => {
        const isTestMode = new URLSearchParams(window.location.search).get('test') === '1';

        // Nếu KHÔNG phải test mode thì mới check các điều kiện chặn
        if (!isTestMode && (isSpinning || hasSpun || isChecking)) return;

        // Nếu đang test mode mà đang quay thì cũng chặn để tránh spam nút
        if (isTestMode && isSpinning) return;

        setIsSpinning(true);
        setShowResultModal(false);

        // Play Tick Sound Loop (Simulation with Deceleration)
        let tickTimeout: any = null;

        const playTick = (currentDelay: number) => {
            if (soundEnabled && sounds.current) {
                sounds.current.tick.play();

                // Increase delay to simulate slowing down (Deceleration)
                const nextDelay = currentDelay * 1.05;

                if (nextDelay < 300) { // Stop if too slow
                    tickTimeout = setTimeout(() => playTick(nextDelay), nextDelay);
                }
            }
        };

        if (soundEnabled) {
            playTick(20); // Start fast (20ms)
        }

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

        // 2. Tính toán góc quay (Fix logic)
        const baseRotation = 1800; // Quay ít nhất 5 vòng (5 * 360)

        // Góc cần đạt được để kim (0deg) chỉ vào giữa ô
        // targetAngle là vị trí tuyệt đối trên vòng tròn (0-360)
        const targetAngle = 360 - (selectedIndex * segmentAngle) - (segmentAngle / 2);

        // Tính góc lệch cần quay thêm từ vị trí hiện tại
        const currentRotationMod = rotation % 360;
        let degreesNeeded = targetAngle - currentRotationMod;

        // Đảm bảo quay theo chiều kim đồng hồ (dương)
        if (degreesNeeded <= 0) {
            degreesNeeded += 360;
        }

        const randomOffset = Math.floor(Math.random() * 20) - 10;
        const newRotation = rotation + baseRotation + degreesNeeded + randomOffset;

        setRotation(newRotation);

        // 3. Xử lý kết quả sau khi quay xong (3s)
        const SPIN_DURATION = 2500; // 3000 -> 2500ms (Nhanh hơn)

        setTimeout(async () => {
            setIsSpinning(false);
            setHasSpun(true); // Đánh dấu đã quay rồi

            // Stop tick sound
            if (tickTimeout) clearTimeout(tickTimeout);
            // Force stop any playing tick sound
            if (sounds.current) {
                sounds.current.tick.stop();
            }

            // Play Win Sound
            if (soundEnabled && sounds.current) {
                sounds.current.win.play();
            }

            const finalResult = handleResult(selectedPrize);

            // 4. Lưu kết quả (Anti-Cheat) - Chỉ lưu nếu KHÔNG phải test mode
            if (!isTestMode) {
                // A. LocalStorage
                localStorage.setItem('lixi2026_result', JSON.stringify(finalResult));

                // B. Supabase
                if (userIP) {
                    await SpinService.saveSpinResult({
                        ip_address: userIP,
                        device_info: navigator.userAgent,
                        prize: selectedPrize.label,
                        prize_value: finalResult.finalValue
                    });
                }
            }
        }, SPIN_DURATION);
    };

    const handleResult = (prize: WheelPrize): SpinResult => {
        let finalValue = 0;
        let message = "";

        if (prize.value === 'SPECIAL') {
            finalValue = Math.floor(Math.random() * (30000 - 20000 + 1)) + 20000;
            finalValue = Math.floor(finalValue / 1000) * 1000;
            const randomWish = NEW_YEAR_WISHES[Math.floor(Math.random() * NEW_YEAR_WISHES.length)];
            message = `🎉 CHÚC MỪNG NĂM MỚI! \n"${randomWish}"`; // Thêm prefix đặc biệt
        } else {
            finalValue = prize.value as number;
            message = "Lộc đầu xuân, cả năm may mắn!";
        }

        const newResult = { prize, finalValue, message };
        setResult(newResult);
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

        return newResult;
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShareData({
            text: `Tôi vừa nhận được lì xì ${result?.finalValue.toLocaleString('vi-VN')} VNĐ cho năm 2026! Đặt gạch ngay!`,
            url: window.location.href
        });
        setShowShareModal(true);
    };

    const handleDownloadImage = async () => {
        if (resultRef.current) {
            try {
                const canvas = await html2canvas(resultRef.current, {
                    backgroundColor: null, // Transparent background if possible, or use computed style
                    scale: 2 // High resolution
                });
                const link = document.createElement('a');
                link.download = `lixi-2026-${Date.now()}.png`;
                link.href = canvas.toDataURL();
                link.click();
            } catch (error) {
                console.error("Failed to capture image:", error);
                throw error; // Throw to let caller handle UI
            }
        }
    };

    return (
        <Card className="w-full max-w-xl mx-auto overflow-hidden relative border-tet-gold/30 bg-black/40 backdrop-blur-xl pb-8">
            {/* Header nhỏ chứa tiêu đề và nút ? */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-tet-gold uppercase drop-shadow-md flex items-center gap-2">
                        <span className="text-2xl">🎡</span> Vòng Quay 2026
                    </h3>
                    {/* Nút Mute/Unmute */}
                    <button
                        onClick={toggleSound}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
                    >
                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                </div>

                <button
                    onClick={() => setShowRules(true)}
                    className="flex items-center gap-1 text-sm text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all border border-white/20 active:scale-95 touch-manipulation"
                >
                    <HelpCircle className="w-5 h-5" />
                    <span>Tỷ lệ trúng</span>
                </button>
            </div>

            <div className="flex flex-col items-center gap-8">

                {/* === PHẦN 1: VÒNG QUAY (TRÊN) === */}
                <div className="relative w-[85vw] h-[85vw] max-w-[300px] max-h-[300px] md:max-w-[350px] md:max-h-[350px] flex-shrink-0 group mx-auto">
                    {/* Kim chỉ */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white drop-shadow-xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>

                    {/* Vòng quay */}
                    <div
                        className={`w-full h-full rounded-full border-[6px] border-tet-gold shadow-[0_0_30px_rgba(255,215,0,0.2)] relative overflow-hidden transition-transform cubic-bezier(0.25, 0.1, 0.25, 1) ${hasSpun ? '' : 'hover:scale-[1.02] duration-300'}`}
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transitionDuration: isSpinning ? '2500ms' : '300ms', // Nhanh hơn: 3s -> 2.5s
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
                    {/* Test Mode Indicator */}
                    {new URLSearchParams(window.location.search).get('test') === '1' && (
                        <div className="text-center mb-2">
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse border border-yellow-400">
                                🐜 DEV MODE: NO LIMIT
                            </span>
                        </div>
                    )}

                    <button
                        onClick={spinWheel}
                        disabled={isSpinning || (hasSpun && new URLSearchParams(window.location.search).get('test') !== '1') || isChecking}
                        className={`
              w-full group relative h-16 rounded-2xl font-black text-xl uppercase tracking-wider shadow-xl transition-all transform
              ${isSpinning || (hasSpun && new URLSearchParams(window.location.search).get('test') !== '1') || isChecking
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-red-900 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] active:scale-95'
                            }
            `}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isChecking ? (
                                <>Đang kiểm tra...</>
                            ) : isSpinning ? (
                                <>Đang quay...</>
                            ) : hasSpun && new URLSearchParams(window.location.search).get('test') !== '1' ? (
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
                    {hasSpun && new URLSearchParams(window.location.search).get('test') !== '1' && (
                        <div className="flex flex-col gap-2 mt-4">
                            <p className="text-center text-[10px] text-gray-400 italic">
                                *Mỗi người chỉ được quay 1 lần (Admin nghèo lắm).
                            </p>
                            <button
                                onClick={() => setShowResultModal(true)}
                                className="text-tet-gold text-sm underline hover:text-white transition-colors"
                            >
                                Xem lại kết quả
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* === MODAL KẾT QUẢ (POPUP) === */}
            {showResultModal && result && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowResultModal(false)}></div>

                    <div
                        ref={resultRef}
                        className="relative w-full max-w-md border-2 border-tet-gold rounded-2xl p-1 shadow-[0_0_50px_rgba(255,215,0,0.3)] backdrop-blur-md overflow-visible"
                        style={{
                            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.95), rgba(69, 10, 10, 0.95))' // Explicit RGBA for html2canvas compatibility
                        }}
                    >

                        {/* Trang trí background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>

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
                                    onClick={handleShareClick}
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

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                data={shareData}
                onDownloadImage={handleDownloadImage}
            />

            {/* Modal Luật Chơi */}
            {/* Modal Luật Chơi */}
            {showRules && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl" onClick={() => setShowRules(false)}></div>
                    <div className="relative bg-gradient-to-br from-red-600 to-tet-dark border-2 border-tet-gold p-6 rounded-xl w-full max-w-md shadow-[0_0_50px_rgba(255,215,0,0.3)] overflow-hidden">

                        {/* Trang trí */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -z-10"></div>

                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-yellow-300 flex items-center gap-2 drop-shadow-md">
                                <HelpCircle className="w-6 h-6 text-tet-gold" /> Cơ Cấu Giải Thưởng
                            </h4>
                            <button onClick={() => setShowRules(false)} className="text-yellow-200 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-yellow-500/30 bg-black/20 backdrop-blur-sm">
                            <table className="w-full text-xs md:text-sm text-left">
                                <thead className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-red-900 shadow-md">
                                    <tr>
                                        <th className="p-3 font-bold border-b border-yellow-700/20">Phần thưởng</th>
                                        <th className="p-3 text-center font-bold border-b border-yellow-700/20">Tỷ lệ</th>
                                        <th className="p-3 text-right font-bold border-b border-yellow-700/20">Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-yellow-500/10 text-yellow-100">
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-3 font-medium">10.000 VNĐ</td>
                                        <td className="p-3 text-center opacity-80">19.1%</td>
                                        <td className="p-3 text-right text-yellow-200/60 font-light italic"></td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-3 font-medium">20.000 VNĐ</td>
                                        <td className="p-3 text-center opacity-80">45.2%</td>
                                        <td className="p-3 text-right text-yellow-200/60 font-light italic">Dễ trúng</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-3 font-medium">50.000 VNĐ</td>
                                        <td className="p-3 text-center opacity-80">15.3%</td>
                                        <td className="p-3 text-right text-yellow-200/60 font-light italic"></td>
                                    </tr>
                                    <tr className="bg-red-500/20 hover:bg-red-500/30 transition-colors">
                                        <td className="p-3 font-bold text-white drop-shadow-sm">100.000 VNĐ</td>
                                        <td className="p-3 text-center text-white font-bold">0.4%</td>
                                        <td className="p-3 text-right text-yellow-300 font-medium">Siêu hiếm</td>
                                    </tr>
                                    <tr className="bg-purple-900/40 hover:bg-purple-900/50 transition-colors border-t border-purple-500/30">
                                        <td className="p-3 font-black text-purple-200 text-shadow-sm">ĐẶC BIỆT</td>
                                        <td className="p-3 text-center font-bold text-purple-200">20.0%</td>
                                        <td className="p-3 text-right text-[10px] leading-tight text-gray-300 max-w-[100px] ml-auto">
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
