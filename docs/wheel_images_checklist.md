# Checklist: Gắn Hình Ảnh Phần Thưởng Vào Vòng Quay 2026

## 1. Chuẩn bị Tài Nguyên (Assets Preparation)
- [ ] Kiểm tra và map file ảnh tương ứng với từng giải thưởng:
    - **10k**: `src/assets/images/10k.jpg`
    - **20k**: `src/assets/images/20k.jpg`
    - **50k**: `src/assets/images/50k.jpg`
    - **100k**: `src/assets/images/100k.jpg` (Hiện tại chỉ có 1 ô 100k, sẽ dùng ảnh này)
    - **Đặc Biệt**: Sử dụng icon bao lì xì (Có thể dùng ảnh `2026.png` hoặc icon SVG từ Lucide/FontAwesome để tạo hình tượng bao lì xì đặc trưng).
    *Note: Các file `200k.jpg`, `500k.jpg` hiện chưa dùng trong cấu hình giải thưởng (WHEEL_PRIZES).*

## 2. Cập nhật Data Structure (`src/utils/random.ts`)
- [ ] Mở rộng interface `WheelPrize` thêm trường `image?: string`.
- [ ] Import các file ảnh vào `random.ts`.
- [ ] Cập nhật mảng `WHEEL_PRIZES` để gắn link ảnh vào từng object giải thưởng.
    - 10k -> `image: img10k`
    - 20k -> `image: img20k`
    - ...
    - Special -> `image: imgSpecial` (hoặc xử lý logic riêng nếu dùng icon).

## 3. Cập nhật UI Vòng Quay (`LuckyWheel.tsx`)
- [ ] Sửa logic render trong hàm `map` của vòng quay:
    - [ ] Thêm thẻ `<img />` vào trong mỗi segment (`div` con của vòng quay).
    - [ ] Căn chỉnh vị trí ảnh:
        - `absolute` positioning.
        - `transform: rotate(...)` ngược lại với góc quay của segment để ảnh luôn đứng thẳng (hoặc xoay theo chiều nan quạt tùy design).
        - Kích thước: `w-8 h-8` hoặc `w-10 h-10` responsive.
    - [ ] Xử lý fallback: Nếu không có ảnh thì vẫn hiện text mệnh giá như cũ.
    - [ ] **Hiệu ứng**: Thêm bóng đổ (`drop-shadow`) cho ảnh để nổi bật trên nền màu.

## 4. Tinh chỉnh CSS & Styling
- [ ] Đảm bảo ảnh không bị `blur` khi xoay.
- [ ] Kiểm tra hiển thị trên Mobile (ảnh không quá to che mất chữ).
- [ ] Với ô **Đặc Biệt**:
    - [ ] Thêm hiệu ứng lấp lánh (animation pulse/glow) cho icon bao lì xì để thu hút.

## 5. Review & Testing
- [ ] Chạy thử vòng quay, đảm bảo ảnh quay theo đúng ô.
- [ ] Kiểm tra hiển thị sau khi quay xong (kết quả hiển thị có cần hiện ảnh không? -> Có thể update modal kết quả luôn).
