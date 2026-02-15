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
