# Checklist Chi Tiết: UI/UX & Assets (Tết 2026)

Tài liệu này chi tiết hóa các hạng mục UI/UX cần thực hiện để đảm bảo trải nghiệm người dùng mượt mà và đậm chất Tết.

## 1. Responsive Design (Giao diện Thích ứng)

Mục tiêu: Đảm bảo hiển thị đẹp trên mọi thiết bị, từ điện thoại nhỏ đến màn hình máy tính lớn.

### 📱 Mobile (iPhone / Android)
- [ ] **Viewport & Layout**:
    - [ ] Kiểm tra hiển thị trên các dòng máy phổ biến: iPhone SE (nhỏ), iPhone 14/15 Pro Max (lớn), Samsung S23...
    - [ ] Đảm bảo không có thanh cuộn ngang (horizontal scroll) ngoài ý muốn.
    - [ ] Padding lề an toàn (safe area) cho các thiết bị có tai thỏ/dynamic island.
- [ ] **Touch Targets (Vùng chạm)**:
    - [ ] Nút "QUAY" phải đủ lớn, dễ bấm bằng ngón cái.
    - [ ] Các nút đóng (X), nút Share, nút Mute âm thanh phải có vùng chạm tối thiểu 44x44px.
- [ ] **Font Size**:
    - [ ] Title không bị ngắt dòng xấu trên màn hình nhỏ.
    - [ ] Text trong các modal (Luật chơi, Kết quả) phải dễ đọc, không quá bé.

### 🖥️ Desktop / Laptop
- [ ] **Container Width**:
    - [ ] Giới hạn chiều rộng nội dung (max-width) để không bị bè ra quá mức trên màn hình rộng.
    - [ ] Canh giữa nội dung background.
- [ ] **Hover Effects**:
    - [ ] Thêm hiệu ứng hover cho các nút bấm (sáng lên, scale nhẹ) để báo hiệu tương tác chuột.
    - [ ] Hover vào các phần quà trên bảng cơ cấu giải thưởng.

## 2. Âm Thanh (Audio) 🔊

Mục tiêu: Tạo không khí sôi động nhưng không gây phiền toái.

- [ ] **Nhạc Nền (Background Music)**:
    - [ ] Chọn bản nhạc Tết không lời, vui tươi (VD: Remix nhẹ nhàng, nhạc cụ dân tộc).
    - [ ] **Cài đặt**: Mặc định TẮT hoặc bật ở mức âm lượng thấp (30%) để tránh giật mình.
    - [ ] Loop (lặp lại) mượt mà.
- [ ] **Hiệu Ứng Âm Thanh (SFX)**:
    - [ ] **Spin Sound**: Tiếng "tick tick tick" khi vòng quay đang chạy (tốc độ khớp với vòng quay càng tốt).
    - [ ] **Win Sound**: Tiếng pháo nổ hoặc tiếng "Ting ting" tiền về khi trúng giải.
    - [ ] **Button Click**: Tiếng click nhẹ khi bấm nút.
- [ ] **Controls (Điều khiển)**:
    - [ ] Nút **Mute/Unmute** (Loa) nổi bật trên góc màn hình (Thường là góc phải trên).
    - [ ] Lưu trạng thái âm thanh (Bật/Tắt) vào `localStorage` (để reload trang không bị reset).

## 3. Hiệu Ứng Hình Ảnh (Visual Effects) ✨

- [ ] **Pháo Hoa (Fireworks/Confetti)**:
    - [ ] [x] Hiệu ứng pháo giấy bung ra khi hiển thị modal kết quả (đã có `canvas-confetti`).
    - [ ] Thêm hiệu ứng pháo hoa nổ (dạng tia lửa) ở background nếu trúng giải đặc biệt/lớn.
- [ ] **Vòng Quay Animation**:
    - [ ] Hiệu ứng ánh sáng chạy quanh viền vòng quay khi đang quay.
    - [ ] Hiệu ứng rung nhẹ (shake) khi vòng quay dừng lại.

## 4. Custom Scrollbar (Thanh Cuộn Vàng Kim) 📜

Mục tiêu: "Đến thanh cuộn cũng phải ăn Tết".

- [ ] **Thiết kế**:
    - [ ] **Track (Nền)**: Màu đỏ đậm (`#8B0000`) hoặc trong suốt.
    - [ ] **Thumb (Thanh kéo)**: Gradient Vàng Kim (`#FFD700` đến `#FFA500`).
    - [ ] **Bo góc**: Rounded cho thumb mềm mại.
    - [ ] **Hover State**: Thumb sáng hơn khi di chuột vào.
- [ ] **Phạm vi áp dụng**:
    - [ ] Toàn trang web (Body).
    - [ ] Nội dung trong Modal (nếu dài quá chiều cao màn hình).

---
**Ghi chú**: Ưu tiên làm phần **Custom Scrollbar** và **Responsive Mobile** trước vì ảnh hưởng trực tiếp đến trải nghiệm nhìn đầu tiên.
