const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = __dirname;
const dbPath = path.join(dataDir, "agrimatch.sqlite");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS schemes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    states TEXT NOT NULL,
    support_types TEXT NOT NULL,
    farmer_types TEXT NOT NULL,
    crops TEXT NOT NULL,
    land_types TEXT NOT NULL,
    benefit TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    documents TEXT NOT NULL,
    official_url TEXT NOT NULL,
    verification_note TEXT NOT NULL,
    verified INTEGER NOT NULL DEFAULT 0
  );
`);

const seedPath = path.join(__dirname,'seed.js');
const seedSchemes = JSON.parse(fs.readFileSync(seedPath, "utf8"));

const insert = db.prepare(`
  INSERT INTO schemes (
    id, name, states, support_types, farmer_types, crops, land_types,
    benefit, eligibility, documents, official_url, verification_note, verified
  ) VALUES (
    @id, @name, @states, @support_types, @farmer_types, @crops, @land_types,
    @benefit, @eligibility, @documents, @official_url, @verification_note, @verified
  )
  ON CONFLICT(id) DO UPDATE SET
    name=excluded.name,
    states=excluded.states,
    support_types=excluded.support_types,
    farmer_types=excluded.farmer_types,
    crops=excluded.crops,
    land_types=excluded.land_types,
    benefit=excluded.benefit,
    eligibility=excluded.eligibility,
    documents=excluded.documents,
    official_url=excluded.official_url,
    verification_note=excluded.verification_note,
    verified=excluded.verified
`);

const seedTransaction = db.transaction(() => {
  for (const s of seedSchemes) {
    insert.run({
      id: s.id,
      name: s.name,
      states: JSON.stringify(s.states),
      support_types: JSON.stringify(s.supportTypes),
      farmer_types: JSON.stringify(s.farmerTypes),
      crops: JSON.stringify(s.crops),
      land_types: JSON.stringify(s.landTypes),
      benefit: s.benefit,
      eligibility: s.eligibility,
      documents: JSON.stringify(s.documents),
      official_url: s.officialUrl,
      verification_note: s.verificationNote,
      verified: s.verified ? 1 : 0
    });
  }
});
seedTransaction();

module.exports = db;
