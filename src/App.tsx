import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { Countdown } from '@/components/features/Countdown';
import { LuckyWheel } from '@/components/features/LuckyWheel';
import type { Prize } from '@/utils/random';

function App() {
  // Tet 2026 (Year of the Horse) is on Feb 17, 2026
  const TET_2026 = '2026-02-17T00:00:00+07:00';
  const [canSpin, setCanSpin] = useState(true); // Set to true for debug
  const [result, setResult] = useState<{ prize: Prize, specialValue?: number } | null>(null);

  const handleSpinEnd = (prize: Prize, specialValue?: number) => {
    setResult({ prize, specialValue });
    // TODO: Save to Supabase
    // TODO: Save to LocalStorage
  };

  return (
    <MainLayout>
      <div className="text-center w-full max-w-4xl mx-auto z-10">
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-4 leading-tight text-white drop-shadow-2xl">
            Tết Bính Ngọ <span className="text-tet-gold">2026</span>
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto opacity-90">
            Trang web nhận lì xì online uy tín nhất hệ mặt trời (vào năm 2026).
            <br />
            Đừng để nước đến chân mới nhảy, hãy xí chỗ ngay hôm nay!
          </p>
        </div>

        {!canSpin ? (
          <Countdown
            targetDate={TET_2026}
            onComplete={() => setCanSpin(true)}
          />
        ) : (
          <div className="animate-fade-in-up w-full flex flex-col items-center">
            {!result ? (
              <div className="transform hover:scale-105 transition-transform duration-300">
                <LuckyWheel onSpinEnd={handleSpinEnd} canSpin={true} />
              </div>
            ) : (
              <div className="bg-tet-dark/95 p-8 rounded-3xl border-4 border-tet-gold shadow-[0_0_50px_rgba(255,215,0,0.3)] animate-bounce-in max-w-md mx-auto">
                <h2 className="text-3xl text-tet-gold font-bold mb-2 uppercase tracking-wider">Chúc Mừng!</h2>
                <div className="text-6xl font-black text-white my-6 drop-shadow-md">
                  {result.prize.id === 'special' ? `${result.specialValue?.toLocaleString()}đ` : result.prize.name}
                </div>
                {result.prize.id === 'special' && <p className="text-yellow-200 italic text-lg">"Năm mới phát tài, vạn sự như ý!"</p>}

                <div className="mt-8 flex justify-center space-x-4">
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-tet-gold text-tet-dark hover:bg-yellow-300 font-bold border-none"
                  >
                    Thử Lại
                  </Button>
                  <Button variant="secondary" onClick={() => alert("Share feature coming soon")}>
                    Khoe Ngay
                  </Button>
                </div>
              </div>
            )}

            {!result && (
              <div className="mt-12">
                <Button variant="secondary" onClick={() => alert("Chức năng đang phát triển")} className="text-sm opacity-70 hover:opacity-100 border-tet-gold/30 text-tet-gold hover:bg-tet-gold/10">
                  Thể Lệ Chương Trình
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default App
