# Responsive Design Rules

Tài liệu này quy định các nguyên tắc thiết kế và lập trình giao diện đáp ứng (Responsive) nhằm đảm bảo trải nghiệm người dùng đồng nhất trên mọi thiết bị.

---

## 1. Triết lý cốt lõi (Core Philosophy)

* **Mobile-First:** Luôn bắt đầu thiết kế và code cho màn hình nhỏ nhất (điện thoại) trước, sau đó mới mở rộng (scale up) lên các màn hình lớn hơn bằng `min-width` media queries.
* **Content is King:** Nội dung quan trọng nhất phải hiển thị đầu tiên và rõ ràng nhất trên mobile. Không ẩn nội dung quan trọng chỉ vì thiếu chỗ (hãy tìm giải pháp UX khác như accordion, tabs).
* **Fluidity:** Giao diện phải "chảy" (flow) mượt mà giữa các điểm ngắt (breakpoints), không được bị gãy hoặc xuất hiện thanh cuộn ngang (horizontal scroll) ngoài ý muốn.

## 2. Hệ thống Breakpoints (Breakpoints System)

Sử dụng các mốc kích thước màn hình tiêu chuẩn sau (dựa trên Tailwind CSS/Bootstrap):

| Ký hiệu | Kích thước (min-width) | Thiết bị tương ứng |
| :--- | :--- | :--- |
| **xs** | < 640px | Điện thoại dọc (Mặc định) |
| **sm** | `640px` | Điện thoại ngang / Tablet nhỏ |
| **md** | `768px` | Tablet dọc / iPad |
| **lg** | `1024px` | Laptop nhỏ / Tablet ngang |
| **xl** | `1280px` | Desktop tiêu chuẩn |
| **2xl** | `1536px` | Màn hình rộng |

**Quy tắc:**
* Hạn chế tạo các breakpoint tùy chỉnh lạ lẫm (ví dụ: `835px`) trừ khi thực sự cần thiết cho một thiết bị cụ thể.
* Sử dụng biến (variables) cho các giá trị breakpoint để dễ bảo trì.

## 3. Layout & Đơn vị đo (Layout & Units)

* **Không dùng kích thước cố định (Fixed Widths):** Tránh dùng `width: px` cho các container chính.
    * ✅ Dùng: `%`, `vw`, `vh`, `fr` (trong Grid), hoặc `max-width`.
    * ❌ Tránh: `width: 960px`.
* **Đơn vị văn bản:** Sử dụng `rem` thay vì `px` để đảm bảo khả năng tiếp cận (accessibility) và scale theo cài đặt của trình duyệt.
* **Flexbox & Grid:** Ưu tiên sử dụng CSS Grid và Flexbox để điều khiển bố cục thay vì `float` hay `position` tuyệt đối.
    * *Ví dụ:* Trên mobile là `flex-direction: column`, trên desktop là `flex-direction: row`.

## 4. Typography (Văn bản)

* **Kích thước font:**
    * Body text không được nhỏ hơn `16px` trên mobile để tránh lỗi "Text too small to read".
    * Sử dụng `clamp()` để font chữ tự động điều chỉnh mượt mà giữa các kích thước màn hình (Fluid Typography).
    * *Ví dụ:* `font-size: clamp(1rem, 2.5vw, 2rem);`
* **Độ dài dòng (Line length):** Giới hạn độ rộng của đoạn văn bản (khoảng 45-75 ký tự trên một dòng) để dễ đọc trên màn hình lớn (`max-width: 65ch`).
* **Line-height:** Tăng khoảng cách dòng trên mobile một chút để dễ đọc hơn.

## 5. Media (Hình ảnh & Video)

* **Luôn Responsive:** Tất cả hình ảnh và video phải có thuộc tính giới hạn chiều rộng.
    ```css
    img, video, iframe {
        max-width: 100%;
        height: auto;
        display: block; /* Tránh khoảng trắng dưới ảnh */
    }
    ```
* **Object Fit:** Sử dụng `object-fit: cover;` để ảnh không bị méo khi thay đổi tỷ lệ khung hình.
* **Art Direction:** Sử dụng thẻ `<picture>` để load các phiên bản ảnh khác nhau cho các thiết bị khác nhau (ví dụ: ảnh vuông cho mobile, ảnh chữ nhật dài cho desktop) để tối ưu băng thông.

## 6. Tương tác (Interaction & Touch)

* **Vùng chạm (Touch Targets):** Trên thiết bị cảm ứng, các nút bấm, liên kết phải có kích thước tối thiểu **44x44px** (theo chuẩn Apple/Google).
* **Khoảng cách an toàn:** Các phần tử tương tác phải cách nhau ít nhất `8px` để tránh bấm nhầm.
* **Hover:** Không dựa hoàn toàn vào trạng thái `:hover` để hiển thị thông tin quan trọng (vì mobile không có chuột để hover). Luôn có trạng thái thay thế (click/tap).
* **Input Fields:**
    * Font size input ít nhất `16px` để tránh việc iOS tự động zoom in khi focus.
    * Sử dụng đúng `type` (email, tel, number) để bàn phím ảo hiển thị phù hợp.

## 7. Kiểm thử (Testing Checklist)

Trước khi commit code, hãy kiểm tra:
- [ ] Không có thanh cuộn ngang (horizontal scrollbar) ở bất kỳ breakpoint nào.
- [ ] Nội dung vẫn đọc được khi zoom trình duyệt lên 200%.
- [ ] Menu điều hướng (Hamburger menu) hoạt động mượt mà trên mobile.
- [ ] Kiểm tra trên thiết bị thật (iOS và Android) nếu có thể, không chỉ dựa vào Chrome DevTools.