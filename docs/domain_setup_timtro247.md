# Domain Setup — timtro247.com

Dự án dùng domain chính `timtro247.com` cho frontend và subdomain `api.timtro247.com` cho backend API.

## 1. DNS records

Tạo các bản ghi DNS trỏ về VPS `180.93.43.169`:

| Type | Name | Value |
|---|---|---|
| A | `@` | `180.93.43.169` |
| A | `www` | `180.93.43.169` |
| A | `api` | `180.93.43.169` |

Sau khi tạo DNS, chờ propagation rồi kiểm tra:

```bash
nslookup timtro247.com
nslookup www.timtro247.com
nslookup api.timtro247.com
```

## 2. Environment

Trên VPS, tạo env từ template:

```bash
cp .env.example backend/.env.docker
```

Các giá trị domain quan trọng:

```env
PUBLIC_BASE_URL=https://timtro247.com
FRONTEND_ORIGINS=http://localhost:5174,http://localhost:2102,https://timtro247.com,https://www.timtro247.com
VITE_API_BASE_URL=https://api.timtro247.com
```

## 3. SSL certificate

Cài Certbot nếu VPS chưa có:

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

Cấp certificate cho cả frontend và API:

```bash
sudo certbot certonly --webroot \
  -w /var/www/certbot \
  -d timtro247.com \
  -d www.timtro247.com \
  -d api.timtro247.com
```

Nginx config đang dùng certificate tại:

```text
/etc/letsencrypt/live/timtro247.com/fullchain.pem
/etc/letsencrypt/live/timtro247.com/privkey.pem
```

## 4. Nginx

Copy config vào VPS và reload:

```bash
sudo cp nginx/conf.d/cheap-accommodation.conf /etc/nginx/conf.d/cheap-accommodation.conf
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Deploy app

```bash
./deploy.sh --no-cache
```

Kiểm tra sau deploy:

```bash
curl -I https://timtro247.com
curl https://api.timtro247.com/api/health
```
