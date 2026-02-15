- 1 trang web tĩnh (static web) để mọi người có thể quay lì xì vào dịp tết

Yêu cầu kỹ thuật:
- Dùng Vite React
- Deploy được trên Vercel và chạy bình thường ở localhost
- Database tĩnh là supabase

Hướng dẫn


```
.env
VITE_SUPABASE_URL=https://vqitjgkpgqplwuvnpefh.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_dOxa8r4c-W5VW0RMeuuhsQ_Ydk8c59R
```

```
utils/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
```

```
App.tsx

import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

function Page() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    function getTodos() {
      const { data: todos } = await supabase.from('todos').select()

      if (todos.length > 1) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </div>
  )
}
export default Page
```


- Cấu trúc dự án chuẩn SPA, dễ mở rộng
- Tuân theo nguyên tắc SOLID, DRY, YAGNI, KISS... khi viết code

Yêu cầu chức năng:
- Giao diện mang không khí tết (Con ngựa tượng trưng cho năm 2026).. người dùng có thể đầu tư thư mục assets cho các thành phần cần thiết như hình ảnh, audio, sfx,...
- Mặc định cấu hình vòng quay may mắn sẽ có các mệnh giá phần thưởng 10000 VND (xác suất 19.1%), 20000 VND (45.2%), 50000 VND (15.3%) , 100000 VND (0.4%) , và phần thưởng đặc biệt (20%) là phần thưởng random trị giá từ 20000 VND đến 30000 VND + 1 lời chúc tết (không có sử dụng AI để tạo lời chúc, cấu hình mặc định)
- Có 1 button là "Hái lộc đầu năm" Nhấn vào đó để quay thưởng
- Xử lý trường hợp truy cập sớm khi chưa đến tết (chỉ nhận quay khi là giao thừa, mồng 1, mồng 2, mồng 3) khi chưa tới thì TẾT LOADING... (xx d: xx h :xx m)
- Có nút ? để người dùng nhấn vào đó xem được xác xuất để 
- Có hiệu ứng js đẹp như click vào sẽ có gì, hiệu ứng mặc định của web,...

- Mỗi người chỉ có 1 lượt quay duy nhất (cần cấu hình đúng vào database để nhận IP+ Tên thiết bị : làm khóa chính chẳng hạn)
- Khi người dùng chụp màn hình, bắt nút sự kiện để chia sẻ trên facebook, zalo, messenger, gmail
Yêu cầu phi chức năng:

- Ưu trải nghiệm UI/UX
+Màu sắc+ hình ảnh: Mang không khí tết...cần tham khảo từ thư mục assets
+Typography (Font chữ) Rõ ràng dễ đọc,tiêu đề và nội dung phân cấp rõ ràng
+ Bố cục (Layout): Sự sắp xếp các phần tử như menu, banner, nút bấm (button) có gọn gàng và cân đối không.

+Các yếu tố tương tác: Hình dạng của nút bấm, ô nhập liệu (input field), các icon biểu tượng.

+ Hiển thị đúng trên IOS/Android/Desktop,... không lệch UI


Lưu ý khi deploy trên Vercel:

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
```
Lưu ý ở dự án này không dùng LLM AI trong code


Cấu trúc dự án mẫu
components/
	features
	layout
	ui
docs/
    lessons_learned.md // Các bài học để lần sau rút kinh nghiệm


