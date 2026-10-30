# DB Query Kit (Oracle SQL + MongoDB Compass JS)

दो kits एक ही app में:

1. **Oracle SQL Kit** — Oracle 11g / 12c / 19c / 21c / XE / Autonomous  
2. **Mongo Shell Kit** — MongoDB Compass → Mongosh JavaScript

**लाल रंग** वाले हिस्से ही बदलने हैं (`TABLE_NAME` / `COLLECTION` / fields)। बाकी वैसा ही छोड़ दें।

## Run locally

```bash
npm install
npm run dev -- -p 43127
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## How to use

1. ऊपर **Oracle SQL** या **MongoDB Compass JS** चुनें।
2. Common fields भरें (optional)।
3. **लाल tokens** बदलें → **SQL Copy** / **JS Copy**।
4. Oracle: SQL Developer / SQLcl · Mongo: Compass → `>_ Mongosh` में paste।

## Notes

- Oracle `COMMIT` वाले templates में commit जरूरी है।
- `FETCH FIRST` Oracle **12c+**; पुराने के लिए `ROWNUM` template।
- Mongo templates Compass Mongosh syntax पर हैं (`db.collection.find()` …)।
