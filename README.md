# Oracle SQL Kit

Oracle database (11g / 12c / 19c / 21c / XE / Autonomous) के लिए ready SQL templates।

**लाल रंग** वाले हिस्से ही बदलने हैं — `TABLE_NAME`, column names, और values। बाकी SQL वैसा ही छोड़ दें।

## Run locally

```bash
npm install
npm run dev -- -p 43127
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## How to use

1. ऊपर common fields भरें (टेबल नाम, columns) — optional।
2. Category चुनें (SELECT, DML, JOIN, Oracle-specific…)।
3. Query में **लाल tokens** अपनी जगह की values से बदलें।
4. **SQL Copy करें** और SQL Developer / SQL\*Plus / SQLcl में चलाएँ।

## Notes

- `COMMIT` वाले templates में Oracle session में बदलाव save करने के लिए commit जरूरी है।
- `FETCH FIRST … ROWS ONLY` Oracle **12c+** पर चलता है; पुराने versions के लिए `ROWNUM` template इस्तेमाल करें।
- Metadata queries (`user_tables`, `user_tab_columns`) हर Oracle edition पर काम करती हैं।
