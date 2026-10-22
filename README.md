# AgriMatch backend (four states)

This project adds a small Express API and SQLite database to the existing vanilla HTML/CSS/JS AgriMatch frontend.

Supported states:
- Madhya Pradesh
- Uttar Pradesh
- Rajasthan
- Maharashtra

## Files

- `server.js` — REST API routes.
- `data/schemes.json` — editable starter scheme dataset.
- `database.js` — creates and seeds SQLite database.
- `database/schema.sql` — database table definition.
- `seed.js` — refreshes database records from JSON.
- `package.json` — Node dependencies and scripts.

## Requirements

Install Node.js 18 or later.

## Run

Open a terminal in this folder:

```bash
npm install
npm run start
```

The first run creates `database/agrimatch.sqlite` and imports records from `data/schemes.json`.

API should run at `http://localhost:3000`.

## API examples

Health check:

```http
GET http://localhost:3000/api/health
```

Supported states:

```http
GET http://localhost:3000/api/states
```

List all schemes for Madhya Pradesh:

```http
GET http://localhost:3000/api/schemes?state=Madhya%20Pradesh
```

Filter by support type:

```http
GET http://localhost:3000/api/schemes?state=Maharashtra&support=income
```

Match a farmer profile:

```http
POST http://localhost:3000/api/match
Content-Type: application/json

{
  "state": "Madhya Pradesh",
  "farmerType": "small",
  "crop": "wheat",
  "land": "small",
  "support": "income"
}
```

Valid `farmerType` values follow the frontend form:
`marginal`, `small`, `other`, `tenant`, `landless`, `unknown`.

Valid crop values follow the frontend form:
`wheat`, `rice`, `soybean`, `pulses`, `cotton`, `vegetables`, `fruits`, `other`.

Valid land values:
`marginal`, `small`, `medium`, `large`, `none`, `unknown`.

Valid support values:
`income`, `insurance`, `credit`, `soil`, `equipment`, `irrigation`, `market`, `multiple`, `pension`.

## Connect your frontend

For the existing form, replace the local `matchSchemes(profile)` call in `script.js` with a POST to `/api/match`. The API returns `{ count, schemes, profile }`. Update card rendering to use the returned field names: `supportTypes`, `benefit`, `eligibility`, `documents`, `officialUrl`, and `verificationNote`.

When using the frontend on a different origin or port, set the API base URL accordingly. `cors` is enabled for local development.

## Important data note

The included records are starter/demo data. Some entries are broad scheme categories rather than individually verified, currently open schemes. They are marked `verified: false`. Before using this for real decisions, verify each scheme's current official eligibility rules, benefit amounts, state notifications, deadlines and application links. Do not present the preliminary matcher as a final eligibility decision.
