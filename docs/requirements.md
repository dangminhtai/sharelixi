# Tài Liệu Yêu Cầu Dự Án: Lì Xì Tết 2026 (Bính Ngọ)

## 1. Giới Thiệu
Dự án xây dựng một web app tĩnh (Static Web Application) "Vòng Quay May Mắn" để người dùng tham gia quay lì xì vào dịp Tết Nguyên Đán 2026 (Năm Ngựa). Mục tiêu là tạo không khí vui vẻ, may mắn đầu năm cho bạn bè và người thân.

## 2. Yêu Cầu Kỹ Thuật (Technical Requirements)
- **Framework**: Vite + React (TypeScript).
- **Hosting**: Vercel (Hỗ trợ SPA và serverless functions nếu cần).
- **Database**: Supabase (Dùng để lưu lịch sử quay, check unique user).
- **Architecture**: Single Page Application (SPA), Clean Code (SOLID, DRY, KISS).
- **Performance**: Tối ưu load nhanh, assets được nén tốt.

## 3. Yêu Cầu Chức Năng (Functional Requirements)

### 3.1. Vòng Quay May Mắn (Lucky Wheel)
- **Cơ cấu giải thưởng**:
  | Phần thưởng | Tỷ lệ trúng | Ghi chú |
  |-------------|-------------|---------|
  | 10.000 VND  | 19.1%       | |
  | 20.000 VND  | 45.2%       | |
  | 50.000 VND  | 15.3%       | |
  | 100.000 VND | 0.4%        | Rất hiếm |
  | Đặc biệt    | 20.0%       | Random 20k-30k + Lời chúc Tết |

- **Cơ chế đặc biệt**:
  - Giải đặc biệt bao gồm số tiền ngẫu nhiên (20k-30k) và một lời chúc Tết được cấu hình sẵn (không dùng AI).

### 3.2. Kiểm Soát Thời Gian & Truy Cập
- **Thời gian mở quay**: Chỉ cho phép quay vào các ngày Tết (Giao thừa, Mồng 1, Mồng 2, Mồng 3).
- **Màn hình chờ (Countdown)**: Nếu truy cập trước thời gian mở -> Hiển thị đồng hồ đếm ngược "TẾT LOADING..." (Ngày:Giờ:Phút).

### 3.3. Quản Lý Lượt Quay (Anti-Cheat)
- **Quy tắc**: Mỗi người chỉ được quay **01 lần duy nhất**.
- **Phương pháp kiểm tra**:
  - Client-side: LocalStorage.
  - Server-side (Supabase): Kiểm tra tính duy nhất dựa trên kết hợp `IP Address` + `User Agent` (Thiết bị).

### 3.4. Tương Tác Người Dùng
- **Nút "Hái lộc đầu năm"**: Kích hoạt vòng quay.
- **Nút "?"**: Xem thông tin tỷ lệ trúng thưởng (Công khai minh bạch).
- **Chia sẻ kết quả**: Khi người dùng trúng thưởng, hỗ trợ chụp ảnh màn hình/chia sẻ nhanh lên Facebook, Zalo, Messenger.

## 4. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

### 4.1. UI/UX (Trải nghiệm người dùng)
- **Theme**: Đậm chất Tết cổ truyền & Năm Ngựa 2026.
- **Responsive**: Hiển thị tốt trên Mobile (ưu tiên), Tablet và Desktop. Không vỡ layout.
- **Effects**:
  - Hiệu ứng âm thanh (nhạc Tết, tiếng quay số, pháo nổ).
  - Hiệu ứng hình ảnh (hoa đào rơi, hiệu ứng quay mượt mà).

### 4.2. Assets
- Sử dụng hình ảnh, âm thanh chất lượng cao nhưng tối ưu dung lượng.
- Font chữ (Typography) dễ đọc, mang phong cách lễ hội.

### 4.3. Bảo Mật & Ổn Định
- Code frontend không được lộ Secret Key (chỉ dùng Anon Key của Supabase).
- Xử lý lỗi gracefully (mất mạng, server Supabase quá tải).

## 5. Cấu Trúc Dữ Liệu (Supabase Schema)
- **Table**: `spin_history`
  - `id`: UUID (Primary Key)
  - `ip_address`: String
  - `device_info`: String (User Agent)
  - `prize`: String (Kết quả quay)
  - `created_at`: Timestamp
