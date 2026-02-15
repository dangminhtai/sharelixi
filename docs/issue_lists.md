# Danh sách vấn đề (Issue List)

## 1. Lỗi Import Component trong MainLayout
**Trạng thái:** 🔴 Open  
**Mức độ:** Cao (Ảnh hưởng trực tiếp đến UI)

### Mô tả vấn đề (Description)
- Hệ thống báo lỗi liên tục: 
  - `Cannot find module './Header' or its corresponding type declarations.`
  - `Cannot find module './Footer' or its corresponding type declarations.`
- Vị trí lỗi: `src/components/layout/MainLayout.tsx`.
- Hậu quả: Ứng dụng không load được layout, hoặc crash màn hình trắng.

### Các hành động đã thực hiện (Actions Taken)
1. Kiểm tra sự tồn tại của file `Header.tsx` và `Footer.tsx` trong thư mục `src/components/layout`. (Đã xác nhận có).
2. Kiểm tra cú pháp Export/Import (Named Export).
3. Re-order các dòng import để tránh lỗi syntax.
4. Kiểm tra cấu hình `tsconfig.json` (`moduleResolution: bundler`).
5. Restart `npm run dev`.

### Kết quả hiện tại
- Vẫn báo lỗi không tìm thấy module.

### Yêu cầu giải pháp (Proposed Solutions)
1. **Kiểm tra Case Sensitive**: Xác nhận lại tên file trên ổ cứng có đúng là `Header.tsx` (Viết hoa) hay không.
2. **Xóa Cache Vite**: Folder `node_modules/.vite` có thể đang lưu cache cũ bị lỗi. Cần xóa đi build lại.
3. **Cấu hình Alias**: Thiết lập alias `@/components/...` trong `vite.config.ts` để import tường minh hơn, tránh lỗi relative path.
4. **Index Barrel**: Tạo file `index.ts` trong thư mục `layout` để export gom nhóm.
