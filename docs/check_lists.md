# Check Lists Dự Án Lì Xì Tết 2026

## 1. Giai Đoạn Khởi Tạo (Initialization)
- [x] Khởi tạo dự án Vite React + TypeScript.
    - [x] Clean up code mẫu.
    - [x] Cấu hình ESLint/Prettier (nếu cần).
- [x] Cài đặt các thư viện cần thiết:
    - [x] `@supabase/supabase-js` (Kết nối Database).
    - [x] `canvas-confetti` (Hiệu ứng pháo hoa).
    - [x] `html2canvas` (Chụp ảnh màn hình để chia sẻ).
- [x] Cấu hình biến môi trường (`.env`):
    - [x] `VITE_SUPABASE_URL`
    - [x] `VITE_SUPABASE_ANON_KEY`
- [x] Thiết lập thư mục `assets` (Icons, Sounds, Images).

## 2. Database & Backend (Supabase)
- [x] Tạo project trên Supabase dashboard.
- [x] Tạo Table `spin_history`:
    - [x] Column `id` (uuid, pk).
    - [x] Column `ip_address` (text).
    - [x] Column `device_info` (text).
    - [x] Column `prize` (text).
    - [x] Column `created_at` (timestamptz).
- [x] Thiết lập RLS (Row Level Security) (Optional: để bảo vệ data nếu cần).
- [x] Kiểm tra kết nối từ Frontend tới Supabase thành công.

## 3. Frontend Development

### 3.1. Màn Hình Chờ (Countdown)
- [x] Hiển thị đúng đồng hồ đếm ngược tới Giao Thừa/Mồng 1.
- [x] Kiểm tra logic chặn quay trước giờ G.
- [x] UI đẹp, mang không khí Tết.

### 3.2. Vòng Quay May Mắn (Lucky Wheel)Component
- [ ] Vẽ được vòng quay với đầy đủ các ô phần thưởng.
- [ ] Hiển thị đúng tên các giải thưởng (10k, 20k, 50k, 100k, Đặc Biệt).
- [ ] Logic quay (Animation) mượt mà, dừng đúng ô kết quả.
- [ ] **Quan trọng**: Logic Random có trọng số (Weighted Random) hoạt động chính xác (Test thử 100 lần xem tỷ lệ).

### 3.3. Xử Lý Kết Quả & Anti-Cheat
- [ ] Kiểm tra `localStorage`: Nếu đã quay -> Chặn/Ẩn nút quay.
- [ ] Kiểm tra `Supabase` (IP Check): Nếu IP đã tồn tại -> Thông báo đã hết lượt.
- [ ] Lưu kết quả quay vào Database sau khi quay xong.
- [ ] Hiển thị Popup chúc mừng + Số tiền trúng thưởng.

### 3.4. Chia Sẻ & Tương Tác
- [ ] Button "Hái lộc đầu năm" hoạt động tốt.
- [ ] Button "?" hiển thị bảng tỷ lệ trúng thưởng.
- [ ] Chức năng "Chia sẻ" (Chụp màn hình kết quả và tải xuống/share).

### 3.5. UI/UX & Assets
- [x] Responsive trên Mobile (iPhone/Android).
- [ ] Responsive trên Desktop.
- [ ] Âm thanh quay số và nhạc nền (Có nút tắt/bật âm thanh nếu cần).
- [ ] Hiệu ứng pháo hoa khi trúng giải.

## 4. Deployment & Verification
- [ ] Deploy lên Vercel thành công (Build không lỗi).
- [ ] Environment Variables trên Vercel đã được cấu hình đúng.
- [ ] Test lại luồng đi từ đầu đến cuối trên môi trường Production (Vercel).
- [ ] Nhờ bạn bè test thử để check lỗi phát sinh.
