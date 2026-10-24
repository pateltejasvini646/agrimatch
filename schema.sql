CREATE TABLE IF NOT EXISTS schemes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  states TEXT NOT NULL,              -- JSON array
  support_types TEXT NOT NULL,       -- JSON array
  farmer_types TEXT NOT NULL,        -- JSON array
  crops TEXT NOT NULL,               -- JSON array
  land_types TEXT NOT NULL,          -- JSON array
  benefit TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  documents TEXT NOT NULL,           -- JSON array
  official_url TEXT NOT NULL,
  verification_note TEXT NOT NULL,
  verified INTEGER NOT NULL DEFAULT 0
);
