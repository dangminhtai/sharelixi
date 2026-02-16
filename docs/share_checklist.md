# Checklist: Tính Năng Chia Sẻ (Share Feature) 🔗📸

Mục tiêu: Cho phép người dùng dễ dàng khoe kết quả "lì xì" lên mạng xã hội (Facebook, Zalo, Messenger) để lan tỏa không khí Tết.

## 1. Yêu cầu (Requirements) - Dựa trên `docs/ideas.md`
- [ ] **Chụp ảnh kết quả**:
    - [ ] Tự động tạo ảnh từ nội dung Popup kết quả (bao gồm số tiền, lời chúc, background).
    - [ ] Sử dụng thư viện `html2canvas` để convert DOM thành image.
- [ ] **Nút Chia Sẻ (Share Options)**:
    - [ ] Khi bấm "Khoe Ngay", hiển thị Modal hoặc Bottom Sheet (Mobile) với các tùy chọn cụ thể:
        - [ ] **Facebook**: Share Link + Caption (dùng `sharer.php`).
        - [ ] **Messenger**: Gửi tin nhắn riêng (dùng `fb-messenger://` hoặc `dialog/send`).
        - [ ] **Zalo**: Sao chép Link + Mở App Zalo (Deep link `zalo://` hoặc hướng dẫn paste).
        - [ ] **Gmail**: Soạn mail sẵn tiêu đề + nội dung (dùng `mailto:`).
        - [ ] **Tải Ảnh**: Lưu ảnh kết quả về máy để tự đăng.
        - [ ] **Sao Chép**: Copy nội dung + link vào clipboard.
- [ ] **Nội dung chia sẻ**:
    - [ ] Text: "Tôi vừa nhận được lì xì [SỐ_TIỀN] VNĐ từ Vòng Quay 2026! Vào hái lộc ngay nào! [LINK_WEB]"
    - [ ] Image: Ảnh chụp màn hình kết quả (Nếu platform hỗ trợ).

## 2. Kỹ thuật (Implementation)
- [ ] **Thư viện**: 
    - [ ] `html2canvas`: Để chụp màn hình div kết quả.
    - [ ] `navigator.share`: API chia sẻ native.
    - [ ] `navigator.clipboard`: Copy nội dung.
- [ ] **Component**: Cập nhật `LuckyWheel.tsx` (phần Modal kết quả).
- [ ] **Zalo Share Helper**: Zalo hơi đặc thù, thường chỉ share được link. Có thể cần hướng dẫn user "Sao chép link" rồi paste vào Zalo.

## 3. Các bước thực hiện
- [ ] **Bước 1**: Cài đặt `html2canvas` (Đã có trong package.json chưa? Nếu chưa thì cài: `npm install html2canvas`).
- [ ] **Bước 2**: Tạo hàm `captureResult()` trong `LuckyWheel.tsx`:
    - [ ] Target vào `div` chứa popup kết quả.
    - [ ] Convert sang Blob/DataURL.
- [ ] **Bước 3**: Cập nhật hàm `handleShare()`:
    - [ ] Kiểm tra `navigator.canShare`.
    - [ ] Nếu Mobile: Gọi `navigator.share({ files: [file_anh], title, text, url })`.
    - [ ] Nếu Desktop/Fail: Fallback sang Copy Clipboard hoặc hiển thị Modal chọn mạng xã hội (Facebook Share Dialog).
- [ ] **Bước 4**: Test trên Mobile (iOS Safari & Android Chrome) để đảm bảo Native Share hiện lên Zalo/Messenger.

## 4. UI/UX
- [ ] Nút "Khoe Ngay" phải nổi bật (Màu xanh Facebook hoặc màu vàng Gold).
- [ ] Icon minh họa: Share, Camera, hoặc Mạng xã hội.
- [ ] Thông báo Toast khi copy thành công ("Đã copy! Dán vào Zalo khoe ngay nha").
