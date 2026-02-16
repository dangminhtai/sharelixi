# Checklist Nâng cấp Giao diện Thượng hạng (Premium UI Upgrade)

Mục tiêu: Đưa dự án từ mức "Đẹp" lên mức "Tuyệt hảo" (9/10 -> 10/10) bằng cách tối ưu hóa các chi tiết nhỏ về thị giác và cảm giác tương tác.

## 1. Chiều sâu 3D cho Vòng Quay (Wheel Depth)
- [ ] **Thêm Inner Shadow**: Thêm lớp `box-shadow: inset ...` vào vòng quay để tạo cảm giác lõm xuống hoặc bề mặt có khối.
- [ ] **Gradient Overlay**: Thêm một lớp phủ (overlay) hình tròn với gradient từ trắng mờ sang đen mờ để giả lập ánh sáng chiếu lên bề mặt vòng quay.
- [ ] **Viền Kim loại**: Nâng cấp viền vàng hiện tại bằng hiệu ứng `conic-gradient` hoặc `linear-gradient` đa điểm để giả lập độ bóng của kim loại vàng thật.

## 2. Hiệu ứng Kính cao cấp (Glassmorphism)
- [x] **Tăng Backdrop Blur**: Nâng thông số `backdrop-blur` từ `sm/md` lên `xl` hoặc `2xl` cho các Modal (Share, Rules, Result).
- [x] **Ultra-thin Border**: Thay border hiện tại bằng viền cực mảnh `0.5px` hoặc `1px` với màu `white/20` để tạo hiệu ứng khúc xạ ánh sáng ở cạnh kính.
- [x] **Refraction Effect**: Thêm một chút gradient chéo mờ ảo trên nền modal để giả lập vết phản chiếu trên mặt kính.

## 3. Trải nghiệm Chờ (Splash & Loading)
- [ ] **Màn hình Splash "2026"**: Thiết kế một lớp phủ toàn màn hình (overlay) biến mất sau 1.5s với logo 2026 phóng to và hiệu ứng mờ dần (fade out).
- [ ] **Skeleton Loading**: Hiển thị khung mờ của vòng quay nếu dữ liệu từ Supabase/IP chưa tải xong để tránh hiện tượng bố cục bị nhảy (Layout Shift).

## 4. Phản hồi Tương tác (Interactive Feedback)
- [x] **Glow on Hover**: Khi di chuột vào khu vực vòng quay, các phân đoạn (segments) hoặc viền vòng quay sẽ phát sáng (radial-glow) theo vị trí chuột.
- [x] **Active State cho Nút bấm**: Thêm hiệu ứng "nhấn lún" rõ rệt hơn và âm thanh click cực nhỏ (click feedback) khi chạm vào nút "Hái lộc".

## 5. Tối ưu hóa Mobile
- [x] **Haptic Feedback**: (Optional/Web API) Thêm rung nhẹ khi vòng quay dừng hoặc khi trúng giải lớn trên các thiết bị hỗ trợ.
- [x] **Safe Area**: Đảm bảo các hiệu ứng tiền rơi và comment không che khuất các nút điều hướng quan trọng trên các dòng iPhone có "tai thỏ".

---
*Ghi chú: Luôn kiểm tra hiệu năng (Performance) sau mỗi bước nâng cấp để đảm bảo không bị giật lag trên máy cấu hình yếu.*
