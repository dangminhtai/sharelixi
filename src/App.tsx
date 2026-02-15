import { MainLayout } from './components/layout/MainLayout';
import { Button } from './components/ui/Button';

function App() {
  return (
    <MainLayout>
      <div className="text-center">
        <h1 className="text-5xl mb-8 text-yellow-300 font-extrabold drop-shadow-md">
          Lì Xì Tết 2026 🧧
        </h1>
        <div className="space-x-4">
          <Button onClick={() => alert("Chức năng đang phát triển!")}>Hái Lộc Ngay</Button>
          <Button variant="secondary" onClick={() => alert("Xem thể lệ")}>Thể Lệ</Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default App
