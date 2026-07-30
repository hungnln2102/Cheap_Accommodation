-- =====================================================================
-- 000_init_schema.sql
-- Schema khởi tạo cho dự án Cheap_Accommodation
-- Tạo: 2026-07-30
-- Mô tả: Schema ban đầu cho hệ thống quản lý cho thuê phòng trọ tại Việt Nam
-- =====================================================================

-- =====================================================================
-- SCHEMA: accommodation
-- Quản lý phòng trọ, khách thuê, hợp đồng
-- =====================================================================
CREATE SCHEMA IF NOT EXISTS accommodation;

-- Bảng: Phòng trọ / căn hộ
CREATE TABLE IF NOT EXISTS accommodation.rooms (
    id          SERIAL PRIMARY KEY,
    room_number VARCHAR(50)     NOT NULL,
    address     TEXT            NOT NULL,
    floor       SMALLINT,
    area_sqm    NUMERIC(6, 2),                                      -- Diện tích (m²)
    rent_price  NUMERIC(12, 0)  NOT NULL,                           -- Giá thuê/tháng (VND)
    deposit     NUMERIC(12, 0)  NOT NULL DEFAULT 0,                 -- Tiền cọc (VND)
    status      VARCHAR(30)     NOT NULL DEFAULT 'available'        -- available | rented | maintenance
                CHECK (status IN ('available', 'rented', 'maintenance')),
    description TEXT,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Bảng: Khách thuê
CREATE TABLE IF NOT EXISTS accommodation.tenants (
    id          SERIAL PRIMARY KEY,
    full_name   VARCHAR(200)    NOT NULL,
    phone       VARCHAR(20)     NOT NULL,
    id_card     VARCHAR(20)     UNIQUE,                             -- CCCD/CMND
    email       VARCHAR(200),
    address     TEXT,                                               -- Địa chỉ thường trú
    notes       TEXT,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Bảng: Hợp đồng thuê phòng
CREATE TABLE IF NOT EXISTS accommodation.contracts (
    id              SERIAL PRIMARY KEY,
    room_id         INTEGER         NOT NULL REFERENCES accommodation.rooms(id),
    tenant_id       INTEGER         NOT NULL REFERENCES accommodation.tenants(id),
    start_date      DATE            NOT NULL,
    end_date        DATE,                                           -- NULL = hợp đồng không thời hạn
    rent_price      NUMERIC(12, 0)  NOT NULL,                      -- Giá thuê khi ký HĐ (có thể khác room)
    deposit         NUMERIC(12, 0)  NOT NULL DEFAULT 0,
    payment_day     SMALLINT        NOT NULL DEFAULT 1             -- Ngày thanh toán hàng tháng (1-28)
                    CHECK (payment_day BETWEEN 1 AND 28),
    status          VARCHAR(30)     NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'expired', 'terminated')),
    notes           TEXT,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Index phòng - hợp đồng
CREATE INDEX IF NOT EXISTS idx_contracts_room_id   ON accommodation.contracts(room_id);
CREATE INDEX IF NOT EXISTS idx_contracts_tenant_id ON accommodation.contracts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status    ON accommodation.contracts(status);
CREATE INDEX IF NOT EXISTS idx_rooms_status        ON accommodation.rooms(status);

-- =====================================================================
-- SCHEMA: payments
-- Quản lý hóa đơn và biên lai thanh toán
-- =====================================================================
CREATE SCHEMA IF NOT EXISTS payments;

-- Bảng: Hóa đơn hàng tháng
CREATE TABLE IF NOT EXISTS payments.invoices (
    id              SERIAL PRIMARY KEY,
    contract_id     INTEGER         NOT NULL REFERENCES accommodation.contracts(id),
    billing_month   DATE            NOT NULL,                       -- Tháng xuất hóa đơn (ngày 1 của tháng)
    rent_amount     NUMERIC(12, 0)  NOT NULL,
    electric_amount NUMERIC(12, 0)  NOT NULL DEFAULT 0,
    water_amount    NUMERIC(12, 0)  NOT NULL DEFAULT 0,
    other_amount    NUMERIC(12, 0)  NOT NULL DEFAULT 0,
    total_amount    NUMERIC(12, 0)  NOT NULL,
    status          VARCHAR(20)     NOT NULL DEFAULT 'unpaid'
                    CHECK (status IN ('unpaid', 'paid', 'partial', 'overdue')),
    due_date        DATE,
    notes           TEXT,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    UNIQUE (contract_id, billing_month)
);

-- Bảng: Biên lai thanh toán
CREATE TABLE IF NOT EXISTS payments.receipts (
    id              SERIAL PRIMARY KEY,
    invoice_id      INTEGER         NOT NULL REFERENCES payments.invoices(id),
    amount          NUMERIC(12, 0)  NOT NULL,
    paid_at         TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    payment_method  VARCHAR(50)     NOT NULL DEFAULT 'cash'
                    CHECK (payment_method IN ('cash', 'transfer', 'vietqr', 'other')),
    reference       VARCHAR(200),                                   -- Mã giao dịch ngân hàng
    notes           TEXT,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Index hóa đơn
CREATE INDEX IF NOT EXISTS idx_invoices_contract_id   ON payments.invoices(contract_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status        ON payments.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_billing_month ON payments.invoices(billing_month);
CREATE INDEX IF NOT EXISTS idx_receipts_invoice_id    ON payments.receipts(invoice_id);

-- =====================================================================
-- GHI CHÚ:
-- - Thêm bảng mới: cập nhật dbSchema.js tương ứng (xem .agents/SKILL.md)
-- - Thêm cột mới: cập nhật COLS trong dbSchema + migration Knex riêng
-- - KHÔNG hardcode tên bảng/cột trong runtime code
-- =====================================================================
