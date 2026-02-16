# Bài học kinh nghiệm (Lessons Learned)

## 1. Lỗi màn hình trắng (White Screen of Death) khi Deploy

**Triệu chứng:**
- App chạy OK ở localhost (nếu có file .env).
- Khi deploy lên Vercel/Production, app hiện màn hình trắng trơn, không load được UI.
- Console báo lỗi liên quan đến khởi tạo SDK hoặc `process.env`.

**Nguyên nhân:**
- Khởi tạo các instance (ví dụ: `new GoogleGenAI()`, `firebase.initializeApp()`, v.v.) ở **Global Scope** (ngay đầu file).
- Khi trình duyệt tải bundle JS, nó thực thi các dòng code top-level này ngay lập tức.
- Nếu Environment Variable (`process.env.API_KEY`) bị thiếu hoặc chưa load kịp, constructor sẽ throw Error.
- Uncaught Error tại top-level sẽ chặn toàn bộ quá trình render của React.

**Cách khắc phục (Best Practice):**
- **Lazy Initialization:** Luôn khởi tạo SDK bên trong hàm hoặc hook, nơi thực sự cần sử dụng nó.
- Kiểm tra biến môi trường (`env vars`) trước khi sử dụng.
- Sử dụng `try/catch` bao quanh logic khởi tạo nếu có thể.

**Ví dụ Code Sai (Global init):**
```typescript
// services/ai.ts
const ai = new SDK(process.env.KEY); // <--- CRASH HERE nếu KEY thiếu
export const doSomething = () => { ai.run(); }
```

**Ví dụ Code Đúng (Lazy init):**
```typescript
// services/ai.ts
export const doSomething = () => {
  if (!process.env.KEY) return handleMissingKey();
  
  const ai = new SDK(process.env.KEY); // <--- Safe
  ai.run();
}

## 3. Thư viện tạo ảnh: html2canvas vs html-to-image

**Triệu chứng:**
- `html2canvas` đôi khi không load được font, lỗi layout hoặc ảnh bị mờ.
- Khó quản lý khi load từ CDN (`window.html2canvas`).

**Bài học:**
- **Sử dụng `html-to-image`**: Thư viện này ổn định hơn, hỗ trợ tốt SVG và Tailwind CSS.
- **Pixel Ratio**: Cấu hình `pixelRatio: 2` (hoặc cao hơn) giúp ảnh xuất ra sắc nét, không bị vỡ hạt trên màn hình độ phân giải cao.
- **Async/Await**: Luôn dùng `await` và thêm một khoảng delay nhỏ (100ms) để đảm bảo DOM đã render hoàn thiện trước khi chụp.

## 4. UI/UX: Toast vs Alert

**Vấn đề:**
- `window.alert()` làm ngưng trệ luồng xử lý của trình duyệt, giao diện thô cứng và không đồng bộ với thiết kế của App.

**Cách làm tốt hơn:**
- **Custom Toast**: Sử dụng component Toast riêng để thông báo (Copy thành công, Tải ảnh xong).
- **Z-Index**: Đảm bảo Toast có `z-index` đủ cao (ví dụ: 200) để luôn nằm trên các Modal khác.
- **Timeout**: Tự động đóng sau 3-5s để người dùng không cần thao tác tắt thủ công.

## 2. Commit đúng trên github
    Mỗi khi làm xong 1 tính năng thì nên commit và push lên github để tránh mất code
    Làm theo step sau:
    ```bash
    git add .
    git commit -m "Tên tính năng"
    git push origin main
    ```
    Chú ý không commit file .env và các file quan trọng, xem file .gitignore để biết thêm chi tiết (hoặc tạo mới thêm nếu chưa có)