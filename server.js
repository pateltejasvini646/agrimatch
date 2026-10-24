const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");
const app = express();

const PORT = process.env.PORT || 3000;
const ALLOWED_STATES = [
  "Madhya Pradesh",
  "Uttar Pradesh",
  "Rajasthan",
  "Maharashtra"
];
const SUPPORT_TYPES = [
  "income", "insurance", "credit", "soil",
  "equipment", "irrigation", "market", "pension"
];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function parseArray(value) {
  try { return JSON.parse(value || "[]"); }
  catch { return []; }
}

function publicScheme(row) {
  return {
    ...row,
    states: parseArray(row.states),
    supportTypes: parseArray(row.support_types),
    farmerTypes: parseArray(row.farmer_types),
    crops: parseArray(row.crops),
    landTypes: parseArray(row.land_types),
    documents: parseArray(row.documents),
    verified: Boolean(row.verified)
  };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "AgriMatch API" });
});

app.get("/api/states", (_req, res) => {
  res.json({ states: ALLOWED_STATES });
});

app.get("/api/schemes", (req, res) => {
  const state = req.query.state;
  const support = req.query.support;
  if (state && !ALLOWED_STATES.includes(state)) {
    return res.status(400).json({
      error: "Only Madhya Pradesh, Uttar Pradesh, Rajasthan and Maharashtra are supported."
    });
  }
  if (support && support !== "all" && !SUPPORT_TYPES.includes(support)) {
    return res.status(400).json({ error: "Unknown support type." });
  }

  let rows = db.prepare("SELECT * FROM schemes ORDER BY name").all().map(publicScheme);
  if (state) rows = rows.filter(s => s.states.includes(state));
  if (support && support !== "all") {
    rows = rows.filter(s => s.supportTypes.includes(support));
  }
  res.json({ count: rows.length, schemes: rows });
});

app.post("/api/match", (req, res) => {
  const { state, farmerType, crop, land, support } = req.body || {};

  if (!ALLOWED_STATES.includes(state)) {
    return res.status(400).json({
      error: "Choose one of the four supported states.",
      allowedStates: ALLOWED_STATES
    });
  }

  if (!farmerType || !crop || !support) {
    return res.status(400).json({
      error: "farmerType, crop and support are required."
    });
  }
  if (!SUPPORT_TYPES.includes(support) && support !== "multiple") {
    return res.status(400).json({ error: "Unknown support type." });
  }

  const allSchemes = db.prepare("SELECT * FROM schemes ORDER BY name").all().map(publicScheme);
  const matches = allSchemes.filter(scheme => {
    const stateMatch = scheme.states.includes(state);
    const supportMatch = support === "multiple" || scheme.supportTypes.includes(support);
    const farmerMatch = scheme.farmerTypes.includes(farmerType) || farmerType === "unknown";
    const landMatch = !land || land === "unknown" || scheme.landTypes.includes(land);
    const cropMatch = scheme.crops.includes("all") || scheme.crops.includes(crop);
    return stateMatch && supportMatch && farmerMatch && landMatch && cropMatch;
  }).map(scheme => ({
    ...scheme,
    matchStatus: "potential_match",
    disclaimer: "This is a preliminary match, not a final eligibility decision. Verify current rules with the official department."
  }));

  res.json({
    profile: { state, farmerType, crop, land: land || "unknown", support },
    count: matches.length,
    schemes: matches
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`AgriMatch API running at http://localhost:${PORT}`);
});
