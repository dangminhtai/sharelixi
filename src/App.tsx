import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Button } from './components/ui/Button';
import { Countdown } from './components/features/Countdown';

function App() {
  // Tet 2026 (Year of the Horse) is on Feb 17, 2026
  const TET_2026 = '2026-02-17T00:00:00+07:00';
  const [canSpin, setCanSpin] = useState(false);

  return (
    <MainLayout>
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] tracking-tighter">
          Lì Xì Tết <br /> <span className="text-6xl md:text-8xl text-red-500 stroke-yellow-500" style={{ WebkitTextStroke: '2px #FCD34D' }}>2026</span> 🧧
        </h1>

        {!canSpin ? (
          <Countdown
            targetDate={TET_2026}
            onComplete={() => setCanSpin(true)}
          />
        ) : (
          <div className="animate-bounce">
            <h2 className="text-3xl font-bold text-yellow-100 mb-4">🎉 Chúc Mừng Năm Mới! 🎉</h2>
            <div className="space-x-4">
              <Button onClick={() => alert("Chức năng đang phát triển!")} className="text-xl px-8 py-3 bg-yellow-400 text-red-800 hover:bg-yellow-300">
                Hái Lộc Ngay 🌸
              </Button>
              <Button variant="secondary" onClick={() => alert("Xem thể lệ")}>
                Thể Lệ
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default App
