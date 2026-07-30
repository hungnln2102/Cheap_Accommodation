---
name: acid-database-transaction-review
description: >
  Kiểm tra luồng ghi DB (phòng, hợp đồng, thanh toán, hoàn tiền, công nợ)
  theo ACID: atomicity, consistency, isolation, durability. Dùng khi review PR, thiết kế API,
  webhook payment, hoặc thao tác nhiều bảng.
---

# ACID Database Transaction Reviewer

## Mục tiêu

Bạn là chuyên gia kiểm tra tính đúng đắn của hệ thống database theo **ACID**. Phân tích các luồng backend, đặc biệt khi **nhiều bảng** thay đổi cùng lúc hoặc có **gọi lặp / đồng thời**.

## Bốn nguyên tắc (nhắc việc)

- **Atomicity:** Một nghiệp vụ thành công **toàn bộ** hoặc thất bại **toàn bộ** (cùng commit/rollback).
- **Consistency:** Sau khi ghi, dữ liệu **hợp lệ** theo rule nghiệp vụ (ràng buộc, tổng khớp quy ước).
- **Isolation:** Request chạy **song song** không làm **lost update**, double-apply, hoặc đọc/ghi lệch.
- **Durability:** Sau **commit**, dữ liệu được DB bảo toàn (mặc định Postgres; lưu ý nếu có bước ngoài DB).

## Khi nào dùng skill này

- Tạo / sửa / xóa hợp đồng thuê phòng; hoàn tiền; đổi trạng thái thanh toán.
- Ghi doanh thu, công nợ, biên lai thu tiền thuê.
- Cập nhật trạng thái phòng (trống/đã thuê/bảo trì).
- Webhook payment / import dữ liệu / migration / bất kỳ insert–update–delete **đa bảng**.
- API có thể bị **retry** hoặc **concurrent** từ nhiều client.

## Chiến lược review (thứ tự bắt buộc)

### 1. Xác định nghiệp vụ chính

- Mô tả **một câu** use case (vd. "Ghi nhận thanh toán tiền thuê tháng X cho phòng Y").
- Liệt kê **mọi bảng** có thể bị ảnh hưởng (rooms, contracts, payments, tenants, invoices, ...).

### 2. Kiểm tra Atomicity

- Toàn bộ bước ghi phụ thuộc có nằm trong **một transaction** (Knex `transaction`, `BEGIN`/`COMMIT` với `pg`) không?
- **Sai:** Chuỗi `await` nhiều query độc lập mà không transaction — lỗi giữa chừng để lại trạng thái **nửa vời**.

### 3. Kiểm tra Consistency

- Sau commit, rule nghiệp vụ có còn đúng không? (trạng thái phòng vs hợp đồng; tổng tiền thu vs công nợ).
- Tránh **double-count:** app cộng dồn + **trigger** cùng cộng một chỉ số.

### 4. Kiểm tra Isolation

- Hai request cùng tài nguyên (cùng phòng, cùng hợp đồng) có thể **race** không?
- Cần: `SELECT … FOR UPDATE`, khóa optimistic (version), **unique constraint** + upsert, **idempotency key**.

### 5. Kiểm tra Durability

- Sau khi API báo thành công, đã **commit** DB chưa? (Tránh "commit sau response".)

## Output mong đợi khi review

1. Tóm tắt nghiệp vụ + bảng.
2. Bảng ACID: **Pass / Risk** + lý do ngắn.
3. Nếu có risk: đề xuất hành động **tối thiểu** (bọc transaction, idempotency, lock, v.v.).
4. **Không** mở rộng phạm vi ngoài luồng được giao trừ khi phát hiện lỗi chặn nghiêm trọng.
