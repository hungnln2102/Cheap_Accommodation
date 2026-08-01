# TỔNG QUAN HỆ THỐNG QUẢN TRỊ (ADMIN DASHBOARD)
Dự án: Cheap Accommodation

## 1. Mục Tiêu Hệ Thống
Trang Admin được xây dựng chung source code với Frontend hiện tại, hoạt động dưới các private routes (chỉ truy cập được sau khi Đăng nhập). Hệ thống giúp quản trị viên và chủ nhà kiểm soát toàn bộ dữ liệu phòng trọ, theo dõi lưu lượng truy cập (traffic), và tình trạng người dùng hoạt động theo thời gian thực.

## 2. Cấu Trúc Tính Năng Chi Tiết

### 2.1. Bảng Điều Khiển Chính (Dashboard)
Đóng vai trò là trung tâm kiểm soát, cung cấp bức tranh toàn cảnh về hiệu suất của nền tảng.
- **Thống Kê Tổng Quan (KPI Cards):**
  - Tổng số phòng hiện có trên hệ thống.
  - Số lượng phòng đang trống vs phòng đã cho thuê.
  - Tổng lượt xem chi tiết phòng (Lượt reach).
- **Theo Dõi User Đang Online (Real-time):**
  - Hiển thị chính xác con số người dùng (khách truy cập) đang duyệt web ngay tại thời điểm hiện tại (Active users right now).
  - Sử dụng Socket.io và Redis ở Backend để đếm số lượng kết nối WebSockets đang mở.
- **Biểu Đồ Lưu Lượng Truy Cập (Traffic Dashboard):**
  - Biểu đồ đường (Line Chart) thể hiện lượt truy cập (Pageviews / Unique Visitors) theo Ngày / Tuần / Tháng.
  - Phân tích nguồn truy cập (Thiết bị Mobile vs Desktop).
  - *Giải pháp:* Backend sẽ xây dựng một middleware ghi nhận traffic vào bảng `page_views` trong PostgreSQL (hoặc tích hợp Google Analytics qua API).

### 2.2. Quản Lý Phòng Trọ (Room Management)
Nơi quản trị viên thực hiện các thao tác Thêm, Sửa, Xóa thông tin các phòng trọ.
- **Danh sách phòng:** Bảng hiển thị phòng dạng lưới/table (Có phân trang, search, lọc theo trạng thái).
- **Thêm/Sửa phòng trọ (Form):**
  - Thông tin cơ bản: Tên, giá thuê, tiền cọc, diện tích.
  - Thông tin mô tả: Trình soạn thảo văn bản Rich Text (WYSIWYG) để viết bài chuẩn SEO.
  - Tiện ích: Checkbox chọn các tiện ích (Máy lạnh, ban công, gửi xe...).
- **Upload Hình Ảnh:** Khu vực kéo thả để upload nhiều ảnh cùng lúc, chọn ảnh làm ảnh bìa (thumbnail).
- **Quản lý Bản đồ (Map Pin):** 
  - Khi nhập địa chỉ, tích hợp bản đồ để Admin có thể click/kéo thả ghim chính xác tọa độ (Lat, Lng).
- **Thay đổi trạng thái nhanh:** Nút gạt (Toggle) chuyển đổi nhanh phòng từ `Còn trống` sang `Đã thuê` hoặc `Ẩn bài`.

### 2.3. Cài Đặt & Cấu Hình Hệ Thống
- Quản lý tài khoản Admin (Đổi mật khẩu, cập nhật profile).
- Cấu hình thông tin liên hệ hiển thị trên web (SĐT, Zalo tư vấn).

## 3. Kiến Trúc Kỹ Thuật (Technical Stack)

- **Frontend (Giao diện Admin):** 
  - Sử dụng chung Vite + React hiện tại.
  - Giao diện (UI): Dùng `lucide-react` cho icons, kết hợp thư viện vẽ biểu đồ `Recharts` hoặc `Chart.js` cho phần Traffic Dashboard.
  - Routing: Bọc các route `/admin/*` bằng component `<ProtectedRoute />` để chặn khách chưa đăng nhập.
- **Backend API:**
  - **Node.js / Express** xử lý API.
  - **Socket.io** thiết lập kết nối thời gian thực để bắt sự kiện `connection` và `disconnect`, từ đó tính toán số User Online.
- **Database (PostgreSQL & Redis):**
  - Redis: Lưu trữ session và đếm số user online siêu tốc (tối ưu hiệu năng so với DB truyền thống).
  - PostgreSQL: Lưu trữ bảng `rooms`, `users`, `traffic_logs` (lưu lịch sử truy cập để vẽ biểu đồ).

## 4. Kế Hoạch Triển Khai (Roadmap)

**Giai đoạn 1: Khởi tạo Backend & Cơ sở dữ liệu**
- Setup Node.js, Express, kết nối PostgreSQL.
- Xây dựng schema cho bảng `users` và API Đăng nhập (JWT).

**Giai đoạn 2: Xây dựng Dashboard & Tracking System**
- Thiết lập Socket.io ở Backend và Frontend để làm tính năng "Số user đang online".
- Tạo bảng ghi nhận Traffic logs.
- Dựng UI trang Dashboard trên Frontend vẽ biểu đồ lưu lượng bằng Recharts.

**Giai đoạn 3: Module Quản Lý Phòng Trọ**
- Hoàn thiện luồng CRUD (Tạo, Đọc, Cập nhật, Xóa) cho phòng trọ.
- Tích hợp upload ảnh (multer lưu file cục bộ hoặc Cloudinary).
- Viết tính năng chọn tọa độ trên bản đồ.

**Giai đoạn 4: Kết nối trang View (Public site)**
- Cập nhật trang chủ và trang chi tiết phòng gọi data thật từ Backend thay cho `mockData.js`.
