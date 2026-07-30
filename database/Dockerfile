FROM postgres:16-alpine

# Copy initialization SQL into the standard init directory.
# PostgreSQL chỉ chạy các file này khi postgres_data volume còn trống (fresh install).
COPY init.sql /docker-entrypoint-initdb.d/00-init.sql
COPY migrations/ /docker-entrypoint-initdb.d/migrations/
