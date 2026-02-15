# Checklist: Quản Lý Lượt Quay & Anti-Cheat (1 Lần/Người)

Tài liệu này chi tiết hóa các giải pháp kỹ thuật để đảm bảo mỗi người dùng chỉ nhận được lì xì một lần duy nhất.

## 1. Client-Side (Kiểm tra nhanh) ⚡
Mục tiêu: Chặn ngay ở giao diện người dùng, không cho bấm nút quay nếu đã quay rồi.

- [x] **LocalStorage**:
    - [x] Khi quay thành công -> Lưu key `hasSpun = true` và `spinResult` (giải thưởng đã trúng) vào `localStorage`.
    - [x] Khi load trang -> Kiểm tra key `hasSpun`.
        - [x] Nếu có: Disable nút quay, hiển thị thông báo "Bạn đã nhận lộc rồi!", hiển thị lại kết quả cũ (nếu cần).
        - [x] Nếu không: Cho phép quay.
- [x] **UI State**:
    - [x] Hiển thị trạng thái "Đã nhận" trên nút bấm (như hiện tại).
    - [x] Thử xóa LocalStorage để test lại flow.

## 2. Server-Side (Supabase - Chốt chặn cuối cùng) 🛡️
Mục tiêu: Ngăn chặn người dùng xóa LocalStorage hoặc dùng trình duyệt ẩn danh để quay lại.

- [x] **Database Schema (`spin_history`)**:
    - [x] Kiểm tra bảng `spin_history` đã có các trường chưa:
        - `ip_address` (Text/Inet): Địa chỉ IP người dùng.
        - `user_agent` (Text): Thông tin thiết bị/trình duyệt.
        - `fingerprint` (Text - Optional): Mã định danh thiết bị (nếu dùng thư viện fingerprintjs).
- [x] **API / Logic nhận diện**:
    - [x] **Lấy IP**: 
        - [x] Cách 1 (Đơn giản): Dùng API miễn phí (VD: `ipify`) ở client lấy IP -> Gửi về Supabase. *(Dễ bị fake nhưng nhanh)*.
        - [ ] Cách 2 (Bảo mật): Dùng **Supabase Edge Function** (Pending - Phase 2).
    - [x] **Kiểm tra trùng lặp (Check Duplicate)**:
        - [x] Trước khi lưu kết quả quay, Query DB xem cặp `(ip_address)` đã tồn tại hay chưa.
- [x] **Kết nối Frontend**:
    - [x] Hàm `checkCanSpin()`: Gọi Supabase check xem IP này đã quay chưa.
    - [x] Hàm `saveSpinResult()`: Lưu kết quả kèm IP.

## 3. Quy trình Quay (Flow) 🔄
1.  Người dùng vào trang.
2.  App check `localStorage`: Có `hasSpun`? -> Chặn.
3.  App check IP (Supabase): IP này có trong DB chưa? -> Chặn.
4.  Nếu cả 2 đều sạch -> Cho phép bấm "QUAY".
5.  Quay xong -> Gọi `saveSpinResult()` lưu vào DB -> Lưu `localStorage`.

---
**Ghi chú**: Giải pháp IP + User Agent không hoàn hảo 100% (ví dụ dùng chung Wifi công ty sẽ trùng IP), nhưng đủ tốt cho minigame vui vẻ. Nếu muốn chặt chẽ hơn cần bắt buộc đăng nhập (Google/Facebook).
