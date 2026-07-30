# Cheap_Accommodation

Hệ thống quản lý triển khai các dự án cho thuê phòng trọ tại Việt Nam.

## 🌐 Domains

| Dịch vụ | URL |
|---|---|
| Frontend | https://room.mavrykpremium.com |
| Backend API | https://roomapi.mavrykpremium.com |

## 🏗️ Kiến trúc

```
Internet
  └─ Host Nginx (VPS — cùng với admin_orderlist)
       ├─ room.mavrykpremium.com     → :8082 (frontend container)
       └─ roomapi.mavrykpremium.com  → :3002 (backend container)

Docker Compose:
  ├─ cheap_accom-postgres  (:5433) — PostgreSQL 16, DB: cheap_accom_db
  ├─ cheap_accom-redis     (:6380) — Redis 7
  ├─ cheap_accom-backend   (:3002) — Node.js API
  └─ cheap_accom-frontend  (:8082) — Vite + Nginx
```

> **Note:** Port offset +1 so với admin_orderlist để tránh xung đột (cùng VPS).

## 🚀 Deploy

### Lần đầu deploy

```bash
# 1. Clone repo
git clone <repo-url> Cheap_Accommodation
cd Cheap_Accommodation

# 2. Tạo file .env từ template
cp .env.example backend/.env.docker
# Chỉnh sửa DB_PASS, SESSION_SECRET, TELEGRAM_BOT_TOKEN, ...

# 3. Deploy
chmod +x deploy.sh
./deploy.sh
```

### Cập nhật sau đó

```bash
./deploy.sh          # Build với cache
./deploy.sh --no-cache   # Force rebuild
```

### Nginx trên Host

Copy file nginx config vào host:
```bash
sudo cp nginx/conf.d/cheap-accommodation.conf /etc/nginx/conf.d/
sudo nginx -t
sudo nginx -s reload
```

## 🗄️ Database

- **Engine**: PostgreSQL 16-alpine (Docker container)
- **DB Name**: `cheap_accom_db`
- **Port host**: `127.0.0.1:5433` (không public ra Internet)
- **Schemas**:
  - `accommodation` — Phòng, khách thuê, hợp đồng
  - `payments` — Hóa đơn, biên lai

### Migrations

```bash
# Chạy migration (sau khi backend đang chạy):
docker compose exec backend npx knex migrate:latest
```

## 🛠️ Development Local

```bash
# Chỉ chạy Postgres + Redis local:
docker compose -f docker-compose.local-dev.yml up -d

# Chạy backend dev:
cd backend && npm run dev

# Chạy frontend dev:
cd frontend && npm run dev
```

## 📁 Cấu trúc thư mục

```
Cheap_Accommodation/
  backend/              ← Node.js/Express API
  frontend/             ← React/Vite frontend
  database/             ← PostgreSQL Docker + migrations
  nginx/                ← Nginx config cho host server
  .agents/              ← Skills, rules, workflows cho AI Agent
  .cursor/              ← Cursor IDE rules + MCP config
  docker-compose.yml
  Dockerfile.frontend
  deploy.sh
  .env.example
```
