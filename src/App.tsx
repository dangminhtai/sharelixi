import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Countdown } from '@/components/features/Countdown';
import { LuckyWheel } from '@/components/features/LuckyWheel';
import { FallingPetals } from '@/components/effects/FallingPetals';
import { MoneyRain } from '@/components/effects/MoneyRain';
import { FloatingComments } from '@/components/effects/FloatingComments';
import img2026 from '@/assets/images/2026.png';

function App() {
  // Tet 2026 (Year of the Horse) is on Feb 17, 2026
  // Tet 2026 (Year of the Horse) is on Feb 17, 2026
  const TET_2026 = '2026-02-17T00:00:00+07:00';
  const [canSpin, setCanSpin] = useState(true); // Set to true for debug

  return (
    <>
      <FloatingComments />
      <FallingPetals />
      <MoneyRain />
      <MainLayout>
        <div className="text-center w-full max-w-4xl mx-auto z-10">
          <div className="mb-10 animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-4 leading-tight text-white drop-shadow-2xl font-tomorrow flex items-center justify-center gap-3 md:gap-4 flex-wrap">
              <span>Tết Bính Ngọ</span>
              <img
                src={img2026}
                alt="2026"
                className="h-12 md:h-24 object-contain inline-block drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </h1>
            <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto opacity-90 font-tomorrow">
              Trang web nhận lì xì online uy tín nhất hệ mặt trời.
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
              <div className="transform hover:scale-105 transition-transform duration-300 w-full">
                <LuckyWheel />
              </div>


            </div>
          )}
        </div>
      </MainLayout>
    </>
  )
}

export default App

export default App
