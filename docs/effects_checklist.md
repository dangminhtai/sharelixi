# Checklist: Hiệu Ứng Âm Thanh & Hình Ảnh (Audio & Visual Effects) 🎆

Mục tiêu: Tăng tính tương tác và không khí Tết cho ứng dụng.

## 1. Âm Thanh (Audio) 🔊
Sử dụng thư viện: `howler` (để quản lý âm thanh tốt hơn, tránh lỗi autoplay của trình duyệt).

### A. Nhạc Nền (Background Music) - 🎵
- [x] **File**: `src/assets/sounds/bgm.mp3` (Đã có).
- [ ] **Yêu cầu**:
    - [ ] Tự động phát khi người dùng tương tác lần đầu (Click bất kỳ đâu).
    - [ ] Loop (lặp lại) vô tận.
    - [ ] Có nút Mute/Unmute ở góc màn hình.
    - [ ] Volume vừa phải (khoảng 0.3 - 0.5) để không át tiếng quay.

### B. Hiệu Ứng Âm Thanh (Sound Effects - SFX) - 🧨
- [x] **Tiếng lạch cạch (Tick Sound)**:
    - [x] **File**: `src/assets/sounds/wheel.mp3` (Đã có).
    - [ ] **Trigger**: Phát mô phỏng theo tốc độ quay (hoặc play loop nếu là file dài).
- [x] **Tiếng Pháo Nổ / Chúc Mừng (Win Sound)**:
    - [x] **File**: `src/assets/sounds/win.mp3` (Đã có).
    - [ ] **Trigger**: Khi vòng quay dừng lại và hiện Popup kết quả.

### C. Tinh Chỉnh (Refinement)
- [ ] **Tốc độ quay**: Điều chỉnh nhanh hơn (Giảm duration từ 3s -> 2s hoặc 2.5s).

---

## 2. Hình Ảnh (Visuals) 🌸

### A. Hiệu Ứng Hoa Đào Rơi (Falling Blossoms) - 🎨 Canvas
- [ ] **Công nghệ**: Custom React Component + HTML5 Canvas (Không cần ảnh, vẽ bằng code hoặc dùng ảnh nhỏ xíu).
- [ ] **Mô tả**:
    - [ ] Cánh hoa đào (hồng nhạt) và hoa mai (vàng) rơi nhẹ nhàng từ trên xuống.
    - [ ] Hiệu ứng lắc lư, xoay nhẹ theo gió.
    - [ ] Mouse interactive: Di chuột vào cánh hoa sẽ bay ra chỗ khác (Optional).
- [ ] **Implementation**: Tạo component `FallingPetals.tsx`.

### B. Hiệu Ứng Quay Mượt Mà (Smooth Spinning) - ⚡ CSS/JS
- [ ] **Cải thiện Animation**:
    - [ ] Dùng `requestAnimationFrame` hoặc CSS `cubic-bezier` custom để mô phỏng vật lý thực (Quay nhanh lúc đầu, đà giảm dần, dừng lại từ từ).
    - [ ] Có thể add thêm hiệu ứng "giật nhẹ" (overshoot) khi kim đi qua gai (Nâng cao).

### C. Hiệu Ứng Chiến Thắng (Winning)
- [ ] **Pháo hoa (Confetti)**: Đã có (`canvas-confetti`).
- [ ] **Lighting**: Hiệu ứng đèn Flash hoặc Spotlight chiếu vào phần thưởng khi dừng.

---

## 3. Tài Nguyên Cần Chuẩn Bị (Assets Needed) 📦
Anh chuẩn bị giúp em các file sau và bỏ vào thư mục `public/assets/sounds/`:
1.  `bgm.mp3` (Nhạc nền)
2.  `tick.mp3` (Tiếng quay 1 nấc)
3.  `win.mp3` (Tiếng nổ/vỗ tay)

*(Nếu chưa có, em có thể dùng mấy link online demo để code trước)*


