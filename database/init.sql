-- init.sql - Bootstrap schema cho Cheap_Accommodation PostgreSQL.
-- PostgreSQL chỉ chạy file này khi postgres_data volume còn trống (fresh install).
-- Không replay từng migration riêng lẻ — dùng consolidated snapshot.

\i /docker-entrypoint-initdb.d/migrations/000_init_schema.sql
