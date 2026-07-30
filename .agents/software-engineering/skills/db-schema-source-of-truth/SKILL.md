---
name: db-schema-source-of-truth-cheap-accommodation
description: >
  Quy tắc bắt buộc cho backend Cheap_Accommodation: mọi bảng/cột PostgreSQL dùng
  trong runtime phải khai báo trong dbSchema và truy cập qua tableName + COLS.
  Đọc khi thêm/sửa migration, query Knex/raw SQL, hoặc chỉnh schema DB.
---

# dbSchema — nguồn sự thật bảng/cột (`Cheap_Accommodation`)

## Phạm vi

- Áp dụng cho **`Cheap_Accommodation/backend/src/**`**: controller, service, webhook (nếu query DB), utils gọi Knex/pg.
- **Migration Knex** và file **SQL thuần** vẫn chứa tên bảng trực tiếp — đó là DDL bình thường; sau khi đổi DB, **bắt buộc** đồng bộ `dbSchema`.

## Quy tắc

1. **Bảng mới**
   - Thêm block `TABLE` + `COLS` vào đúng file trong `backend/src/config/dbSchema/schemas/`, **theo đúng PostgreSQL schema**.
   - Export gom tại `backend/src/config/dbSchema.js`.

2. **Cột mới**
   - Thêm key trong `COLS` của bảng tương ứng (SCREAMING_SNAKE cho key, giá trị là tên cột DB đúng y chang PostgreSQL).
   - Trong code: **`schema.COLS.TEN_KEY`** — **không** chuỗi `"column_name"` rời.

3. **Qualified table**
   - Luôn: `tableName(SOME_SCHEMA.SOME_TABLE.TABLE, SCHEMA_*)`.
   - **Cấm** trong runtime: `` `${schema}.${table}` `` tự ghép từ string, trừ file migration/SQL.

4. **Raw SQL / template**
   - Chèn tên bảng: `${tableName(...)}` hoặc alias đã build từ bước trên.
   - Chèn tên cột: `` `... ${COLS.FIELD} ...` ``.

5. **Sau khi đổi DB**
   - Cập nhật `dbSchema` cùng PR/migration.

## Vi phạm thường gặp (tránh)

- `db("accommodation.rooms")` mà **không** map về `ACCOMMODATION_SCHEMA.ROOMS.TABLE`.
- SELECT chỉ liệt kê string `"id", "room_number"` thay vì hằng `COLS`.
- Thêm cột migration nhưng quên `dbSchema` → query lệch.
