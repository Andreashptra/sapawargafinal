-- ============================================
-- Migration SQL untuk Supabase
-- Aplikasi Pengaduan Masyarakat
-- ============================================

-- 1. Tabel Level
CREATE TABLE IF NOT EXISTS level (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabel Users (Admin/Officer)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  officer_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  photo VARCHAR,
  level_id INTEGER REFERENCES level(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_level_id ON users(level_id);

-- 3. Tabel Society (Masyarakat)
CREATE TABLE IF NOT EXISTS society (
  id SERIAL PRIMARY KEY,
  nik VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR,
  password VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  photo VARCHAR NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tabel Complaint (Pengaduan)
CREATE TABLE IF NOT EXISTS complaint (
  id SERIAL PRIMARY KEY,
  date_complaint TIMESTAMPTZ NOT NULL,
  nik VARCHAR NOT NULL,
  contents_of_the_report TEXT NOT NULL,
  photo VARCHAR NOT NULL DEFAULT '',
  status VARCHAR NOT NULL DEFAULT '0',
  society_id INTEGER REFERENCES society(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_complaint_society_id ON complaint(society_id);

-- 5. Tabel Response (Tanggapan) - termasuk evidence_photo untuk bukti penanganan
CREATE TABLE IF NOT EXISTS response (
  id SERIAL PRIMARY KEY,
  complaint_id INTEGER NOT NULL UNIQUE REFERENCES complaint(id) ON DELETE CASCADE,
  response_date TIMESTAMPTZ,
  response TEXT,
  evidence_photo VARCHAR,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_response_user_id ON response(user_id);

-- ============================================
-- Trigger: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_level_updated_at
  BEFORE UPDATE ON level
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_society_updated_at
  BEFORE UPDATE ON society
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_complaint_updated_at
  BEFORE UPDATE ON complaint
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_response_updated_at
  BEFORE UPDATE ON response
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE level ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE society ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint ENABLE ROW LEVEL SECURITY;
ALTER TABLE response ENABLE ROW LEVEL SECURITY;

-- Policy: Allow full access for service_role (backend API)
CREATE POLICY "Service role full access" ON level FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON society FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON complaint FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON response FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Seed Data: Level & Admin user
-- Password: 123456 (bcrypt hash)
-- ============================================
INSERT INTO level (id, name) VALUES
  (1, 'Administrator'),
  (2, 'Officer')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

SELECT setval('level_id_seq', (SELECT MAX(id) FROM level));

-- Admin user (password: 123456)
INSERT INTO users (officer_name, email, username, password, phone_number, photo, level_id)
VALUES (
  'Administrator',
  'admin@gmail.com',
  'Administrator',
  '$2a$12$akOwLiPYjCBPUTh0JggKgOav9CM6bu.t/dZK3Uh/NztdCSqI274Fy',
  '088228740010',
  '',
  1
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  officer_name = EXCLUDED.officer_name;

-- Officer user (password: 123456)
INSERT INTO users (officer_name, email, username, password, phone_number, photo, level_id)
VALUES (
  'Officer',
  'officer@gmail.com',
  'Officer',
  '$2a$12$akOwLiPYjCBPUTh0JggKgOav9CM6bu.t/dZK3Uh/NztdCSqI274Fy',
  '088228740010',
  '',
  2
)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  officer_name = EXCLUDED.officer_name;

-- ============================================
-- Jika tabel response sudah ada tapi belum punya kolom evidence_photo:
-- ALTER TABLE response ADD COLUMN IF NOT EXISTS evidence_photo VARCHAR;
-- ============================================
