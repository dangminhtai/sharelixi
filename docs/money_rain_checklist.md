# Checklist: Hiệu Ứng Mưa Lì Xì (Money Rain) 🧧💸

Mục tiêu: Tạo hiệu ứng mưa lì xì và tiền vàng khi người dùng tương tác (Click/Hold), mang lại cảm giác "tiền vào như nước".

## 1. Yêu cầu (Requirements)
- [ ] **Hiệu ứng Click (Tap)**:
    - [ ] Khi click chuột hoặc chạm vào màn hình -> Bắn ra một chùm lì xì + tiền vàng từ vị trí đó.
    - [ ] Số lượng hạt: Vừa phải (10-15 hạt) để không che lấp nội dung.
- [ ] **Hiệu ứng Giữ Chuột (Hold/Press)**:
    - [ ] Khi giữ chuột trái hoặc ngón tay -> Phun lì xì liên tục như vòi phun nước.
    - [ ] Dừng lại ngay lập tức khi thả tay ra.
- [ ] **Hình ảnh hạt (Particles)**:
    - [ ] Sử dụng Emoji để nhẹ và sắc nét: 🧧 (Bao lì xì), 💰 (Túi tiền), 💸 (Tiền bay), 🪙 (Đồng xu).
    - [ ] Màu sắc bổ sung: Vàng (Gold) và Đỏ (Red) confetti thường.
- [ ] **Hiệu năng (Performance)**:
    - [ ] Không gây lag giật, đặc biệt trên mobile.
    - [ ] Tự động dọn dẹp hạt sau khi rơi hết.

## 2. Kỹ thuật (Implementation Details)
- [ ] **Thư viện**: `canvas-confetti` (Đã có sẵn trong project).
- [ ] **Custom Shape**: Sử dụng `confetti.shapeFromText({ text: '🧧' })` để tạo hình hạt tiền.
- [ ] **Component**: Tạo `src/components/effects/MoneyRain.tsx`.
    - [ ] Sử dụng `useEffect` để lắng nghe sự kiện global `mousedown`, `mouseup`, `touchstart`, `touchend`.
    - [ ] Dùng `requestAnimationFrame` cho hiệu ứng continuous loop khi giữ chuột.

## 3. Các bước thực hiện
- [ ] Tạo shape object từ Emoji (chỉ tạo 1 lần để tối ưu performance).
- [ ] Viết hàm `fireConfetti(x, y)` bắn ra từ tọa độ chuột.
- [ ] Xử lý logic Click (Single shot).
- [ ] Xử lý logic Hold (Loop fire).
- [ ] Tích hợp vào `App.tsx` hoặc `MainLayout`.
