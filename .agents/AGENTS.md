# Project Rules and Principles

> [!IMPORTANT]
> Đây là các nguyên tắc và luật tối cao của dự án. Bạn PHẢI luôn tuân thủ và không bao giờ được làm ngược lại.

## Conventions
- Mọi file tiếng Việt phải viết bằng tiếng Việt có dấu, lưu dạng UTF-8.
- Luôn luôn sửa file/function chính trực tiếp khi phát sinh lỗi hoặc cần cải tiến. Không được viết function mới đè lên hoặc bọc quanh function cũ nhằm che giấu lỗi, tránh làm phình code và gây khó khăn cho việc bảo trì sau này.

## Event Bus & Hybrid Architecture
- Mọi function và nghiệp vụ xử lý ở Backend nội bộ cần phải ưu tiên triển khai theo hệ thống Event Bus (Event-driven) để đảm bảo tính module hóa, dễ bảo trì và mở rộng.
- Đối với giao tiếp Client - Server (Frontend gọi Backend), áp dụng kiến trúc Lai (Hybrid) như sau:
  - Các tính năng thời gian thực (như tracking user online, traffic, notifications...) BẮT BUỘC sử dụng Event (WebSockets/Socket.io).
  - NGOẠI LỆ: Các luồng lấy dữ liệu public hiển thị cho người dùng cuối (ví dụ: lấy danh sách phòng, xem chi tiết phòng) sẽ dùng chuẩn REST API (HTTP GET) nhằm tối ưu hóa bộ nhớ đệm (Cache/CDN) và đảm bảo chuẩn SEO.
  - Đối với những tính năng khác phát sinh trong tương lai, nếu việc dùng Event Bus không tối ưu, AI bắt buộc phải thông báo và giải thích rõ ràng lý do cho User trước khi thực hiện.

## Debugging & Troubleshooting
- Khi sửa lỗi, bắt buộc phải kết hợp sử dụng Knowledge Graph của dự án để phân tích kỹ các mối liên kết và luồng hoạt động liên quan đến cấu trúc đang bị lỗi. Phải đánh giá toàn diện xem phương án sửa đổi có gây ra lỗi phụ (side effect) cho các tính năng hoặc luồng liên kết khác hay không, tuyệt đối không được sửa lỗi một cách độc lập mà không chú ý đến các luồng liên đới.

## Authority & Execution Control
- Luôn luôn và tuyệt đối không được tự ý sửa đổi file, thực thi lệnh thay đổi hệ thống hoặc triển khai code khi chưa nhận được sự đồng ý và xác nhận trực tiếp, rõ ràng bằng tin nhắn của User (kể cả khi hệ thống báo đã tự động duyệt).
