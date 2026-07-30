---
name: Cheap_Accommodation Project Knowledge
description: >
  Kiến thức nền tảng về project Cheap_Accommodation: quy ước code, cấu trúc DB,
  nghiệp vụ quản lý cho thuê phòng trọ tại Việt Nam, conventions chung.
  Đọc file này trước khi làm bất kỳ task nào trong project này.
---

# Cheap_Accommodation — Project Knowledge Base

## 🏠 Tổng Quan Dự Án

Hệ thống quản lý triển khai các dự án cho thuê phòng trọ tại Việt Nam.

**Mục tiêu chính:**
- Quản lý danh sách phòng trọ, căn hộ cho thuê
- Quản lý hợp đồng thuê phòng
- Quản lý thu tiền thuê hàng tháng
- Quản lý khách thuê (thông tin, hợp đồng, thanh toán)
- Báo cáo doanh thu, công nợ, tình trạng phòng

## 📁 Cấu Trúc Dự Án

```
Cheap_Accommodation/
  backend/              ← Node.js / Express API
  frontend/             ← React / Next.js UI
  database/             ← Migration scripts, schema SQL
  docs/                 ← Tài liệu nghiệp vụ
  .agents/              ← Skills, rules, workflows cho AI Agent
  .cursor/              ← Cursor IDE rules + MCP config
```

## 🗄️ Database Conventions

### Nguyên tắc bắt buộc khi dùng DB
```js
// LUÔN dùng constants từ dbSchema — KHÔNG hardcode tên table/cột
const {
  SCHEMA_ACCOMMODATION,
  ACCOMMODATION_SCHEMA,
  tableName,
} = require("../config/dbSchema");

const TABLE = tableName(ACCOMMODATION_SCHEMA.ROOMS.TABLE, SCHEMA_ACCOMMODATION);
const COLS  = ACCOMMODATION_SCHEMA.ROOMS.COLS;
```

### Các Schema chính (dự kiến)
- **`accommodation`** — Schema chính: phòng, hợp đồng, khách thuê
- **`payments`** — Thanh toán, công nợ, biên lai

## 🚀 Deploy & Infrastructure

### Domain & Ports

| Thành phần | Domain / Port Host | Port Container | Ghi chú |
|---|---|---|---|
| Frontend | `room.mavrykpremium.com` → `127.0.0.1:8082` | `:80` | React/Vite build |
| Backend API | `roomapi.mavrykpremium.com` → `127.0.0.1:3002` | `:3002` | Node.js Express |
| PostgreSQL | `127.0.0.1:5433` | `:5432` | **DB MỚI** — không dùng chung admin_orderlist |
| Redis | `127.0.0.1:6380` | `:6379` | Cache/Session mới |

> **Port offset +1 so với admin_orderlist** (5432→5433, 6379→6380, 3001→3002, 8081→8082) để tránh xung đột khi cùng VPS.

### Container Names (Docker)

```
cheap_accom-postgres    ← DB mới, volume: cheap_accom_postgres_data
cheap_accom-redis       ← Redis mới, volume: cheap_accom_redis_data
cheap_accom-backend     ← Node.js API
cheap_accom-frontend    ← Nginx serving Vite build
```

### Database

- **DB Name**: `cheap_accom_db`
- **DB User**: `accom_admin`
- **Schema**: `accommodation` (rooms, tenants, contracts) + `payments` (invoices, receipts)
- **PostgreSQL version**: 16-alpine (Docker)

### SSL

Dùng chung wildcard cert `*.mavrykpremium.com` với `admin_orderlist`.
- `ssl_certificate /etc/nginx/ssl/fullchain.pem`
- `ssl_certificate_key /etc/nginx/ssl/privkey.pem`

### Deploy

```bash
# Trên server:
cd /path/to/Cheap_Accommodation
./deploy.sh

# Force rebuild không cache:
./deploy.sh --no-cache
```

---

## ⚠️ Quy Tắc Bắt Buộc Khi Sửa Code

1. **Không hardcode** string status → dùng `STATUS.*`
2. **Không hardcode** tên table/cột → dùng `COLS.*` + `tableName()`
3. Mỗi scheduler task xuất `createXxxTask()` factory
4. Luôn `try/catch` riêng từng record trong vòng lặp — lỗi 1 record không dừng cả job
5. Mọi tính năng backend mới đặt trong `backend/src/domains/<tên-domain>/`

## 🇻🇳 Vietnamese Encoding Safety — Quy Tắc Bắt Buộc

> **Mọi thao tác ghi/sửa file chứa tiếng Việt → Dùng tool IDE (write_to_file, replace_file_content) hoặc Node.js/Python script. KHÔNG BAO GIỜ dùng PowerShell để ghi nội dung file.**

### Vấn đề
PowerShell 5.x trên Windows dùng **UTF-16 LE BOM** hoặc **ANSI** khi ghi file → phá hủy ký tự tiếng Việt (mojibake).

### ❌ TUYỆT ĐỐI KHÔNG LÀM
```powershell
# CẤM — Tất cả các cách sau gây lỗi encoding tiếng Việt:
echo "Xin chào" > file.js
"Xin chào" | Out-File file.js
Set-Content -Path file.js -Value "Xin chào"
Add-Content -Path file.js -Value "Xin chào"
(Get-Content file.js) -replace 'old', 'mới' | Set-Content file.js
```

### ✅ PHẢI LÀM
1. **Tool IDE**: `write_to_file`, `replace_file_content`, `multi_replace_file_content` — AN TOÀN 100%
2. **Node.js script** khi cần logic phức tạp:
   ```javascript
   const fs = require('fs');
   const content = fs.readFileSync('file.js', 'utf8');
   const updated = content.replace('old', 'Nội dung tiếng Việt mới');
   fs.writeFileSync('file.js', updated, 'utf8');
   ```

### PowerShell vẫn OK cho
- `npm run dev`, `npm install`, `git add/commit`, `dir`, `node script.js`, `python script.py`
- Tức là mọi command **không ghi nội dung tiếng Việt vào file**
