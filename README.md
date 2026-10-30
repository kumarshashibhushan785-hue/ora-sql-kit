# DB Query Kit (Oracle SQL + MongoDB Compass JS)

दो kits एक ही app में:

1. **Oracle SQL Kit** — Oracle 11g / 12c / 19c / 21c / XE / Autonomous  
2. **Mongo Shell Kit** — MongoDB Compass → Mongosh JavaScript

**लाल रंग** वाले हिस्से ही बदलने हैं (`TABLE_NAME` / `COLLECTION` / fields)। बाकी वैसा ही छोड़ दें।

## Password lock

Kit link खोलने पर **password** माँगा जाता है। काम खत्म होने पर ऊपर **Logout** दबाएँ।

| Variable | Meaning |
|----------|---------|
| `SITE_PASSWORD` | Login password (Vercel env में set करें) |
| `AUTH_SECRET` | Cookie sign करने वाला secret (optional लेकिन recommended) |

Local default password (अगर env नहीं है): `kit123`

Vercel: Project → **Settings → Environment Variables** → `SITE_PASSWORD` add → **Redeploy**.

## Run locally

```bash
npm install
# optional: cp .env.example .env.local  then edit SITE_PASSWORD
npm run dev -- -p 43127
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127) → login page.

## How to use

1. ऊपर **Oracle SQL** या **MongoDB Compass JS** चुनें।
2. Common fields भरें (optional)।
3. **लाल tokens** बदलें → **SQL Copy** / **JS Copy**।
4. Oracle: SQL Developer / SQLcl · Mongo: Compass → `>_ Mongosh` में paste।

## Notes

- Oracle `COMMIT` वाले templates में commit जरूरी है।
- `FETCH FIRST` Oracle **12c+**; पुराने के लिए `ROWNUM` template।
- Mongo templates Compass Mongosh syntax पर हैं (`db.collection.find()` …)।
