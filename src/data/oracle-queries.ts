import type { QueryTemplate as SharedQueryTemplate } from "@/data/types";

export type QueryCategory =
  | "select"
  | "dml"
  | "ddl"
  | "join"
  | "oracle"
  | "meta";

export type QueryTemplate = SharedQueryTemplate & {
  category: QueryCategory;
};

export const CATEGORIES: {
  id: QueryCategory | "all";
  labelHi: string;
  labelEn: string;
}[] = [
  { id: "all", labelHi: "सभी", labelEn: "All" },
  { id: "select", labelHi: "Select", labelEn: "SELECT" },
  { id: "dml", labelHi: "Insert / Update", labelEn: "DML" },
  { id: "ddl", labelHi: "Create Table", labelEn: "DDL" },
  { id: "join", labelHi: "Join", labelEn: "JOIN" },
  { id: "oracle", labelHi: "Oracle खास", labelEn: "Oracle" },
  { id: "meta", labelHi: "Metadata", labelEn: "Meta" },
];

/**
 * Placeholders in {{RED}} are the only parts you must replace
 * for your own table / columns / values.
 * Syntax works on Oracle 11g / 12c / 19c / 21c / XE / Autonomous.
 */
export const QUERIES: QueryTemplate[] = [
  {
    id: "select-all",
    category: "select",
    titleHi: "सभी rows देखें",
    titleEn: "Select all rows",
    descHi: "टेबल का पूरा data निकालने के लिए सबसे आम query।",
    sql: `SELECT *
FROM {{TABLE_NAME}};`,
  },
  {
    id: "select-columns",
    category: "select",
    titleHi: "खास columns चुनें",
    titleEn: "Select specific columns",
    descHi: "सिर्फ जरूरी fields ही लाएँ — तेज़ और साफ़ result।",
    sql: `SELECT {{COLUMN_1}}, {{COLUMN_2}}, {{COLUMN_3}}
FROM {{TABLE_NAME}};`,
  },
  {
    id: "select-where",
    category: "select",
    titleHi: "शर्त के साथ filter",
    titleEn: "Filter with WHERE",
    descHi: "किसी एक field की value से rows छानें।",
    sql: `SELECT {{COLUMN_1}}, {{COLUMN_2}}
FROM {{TABLE_NAME}}
WHERE {{FILTER_COLUMN}} = {{FILTER_VALUE}};`,
    tips: [
      "Text value हो तो quotes लगाएँ: 'ACTIVE'",
      "Number हो तो बिना quotes: 101",
    ],
  },
  {
    id: "select-like",
    category: "select",
    titleHi: "नाम / text खोजें (LIKE)",
    titleEn: "Search text with LIKE",
    descHi: "आंशिक match के लिए % इस्तेमाल करें।",
    sql: `SELECT {{COLUMN_1}}, {{COLUMN_2}}
FROM {{TABLE_NAME}}
WHERE {{SEARCH_COLUMN}} LIKE '%{{SEARCH_TEXT}}%';`,
  },
  {
    id: "select-order-limit",
    category: "select",
    titleHi: "Sorted + top N rows (12c+)",
    titleEn: "Order + FETCH FIRST",
    descHi: "Oracle 12c और ऊपर — पुराने versions के लिए नीचे ROWNUM template देखें।",
    sql: `SELECT {{COLUMN_1}}, {{COLUMN_2}}
FROM {{TABLE_NAME}}
ORDER BY {{SORT_COLUMN}} DESC
FETCH FIRST {{N}} ROWS ONLY;`,
  },
  {
    id: "select-rownum",
    category: "oracle",
    titleHi: "Top N rows (11g / हर version)",
    titleEn: "Top N with ROWNUM",
    descHi: "पुराने Oracle सहित हर edition पर चलता है।",
    sql: `SELECT *
FROM (
  SELECT {{COLUMN_1}}, {{COLUMN_2}}
  FROM {{TABLE_NAME}}
  ORDER BY {{SORT_COLUMN}} DESC
)
WHERE ROWNUM <= {{N}};`,
  },
  {
    id: "select-aggregate",
    category: "select",
    titleHi: "Count / Sum / Group",
    titleEn: "Aggregate + GROUP BY",
    descHi: "कुल गिनती या योग निकालने के लिए।",
    sql: `SELECT {{GROUP_COLUMN}}, COUNT(*) AS TOTAL_ROWS
FROM {{TABLE_NAME}}
GROUP BY {{GROUP_COLUMN}}
ORDER BY TOTAL_ROWS DESC;`,
  },
  {
    id: "insert-one",
    category: "dml",
    titleHi: "एक row डालें",
    titleEn: "Insert one row",
    descHi: "नया record add करने की standard query।",
    sql: `INSERT INTO {{TABLE_NAME}} ({{COLUMN_1}}, {{COLUMN_2}}, {{COLUMN_3}})
VALUES ({{VALUE_1}}, {{VALUE_2}}, {{VALUE_3}});

COMMIT;`,
    tips: ["Oracle में बदलाव save करने के लिए COMMIT जरूरी है।"],
  },
  {
    id: "update-one",
    category: "dml",
    titleHi: "Row अपडेट करें",
    titleEn: "Update rows",
    descHi: "WHERE के बिना UPDATE पूरा टेबल बदल देगा — सावधान रहें।",
    sql: `UPDATE {{TABLE_NAME}}
SET {{COLUMN_1}} = {{NEW_VALUE}}
WHERE {{FILTER_COLUMN}} = {{FILTER_VALUE}};

COMMIT;`,
  },
  {
    id: "delete-one",
    category: "dml",
    titleHi: "Row हटाएँ",
    titleEn: "Delete rows",
    descHi: "हमेशा WHERE रखें; वरना सारा data मिट जाएगा।",
    sql: `DELETE FROM {{TABLE_NAME}}
WHERE {{FILTER_COLUMN}} = {{FILTER_VALUE}};

COMMIT;`,
  },
  {
    id: "create-table",
    category: "ddl",
    titleHi: "नया टेबल बनाएँ",
    titleEn: "Create table",
    descHi: "आम Oracle data types के साथ basic table।",
    sql: `CREATE TABLE {{TABLE_NAME}} (
  {{ID_COLUMN}}     NUMBER        PRIMARY KEY,
  {{NAME_COLUMN}}   VARCHAR2(100) NOT NULL,
  {{STATUS_COLUMN}} VARCHAR2(20)  DEFAULT 'ACTIVE',
  {{CREATED_AT}}    DATE          DEFAULT SYSDATE
);`,
  },
  {
    id: "inner-join",
    category: "join",
    titleHi: "दो टेबल जोड़ें (INNER JOIN)",
    titleEn: "INNER JOIN",
    descHi: "दोनों टेबल में match होने वाले records।",
    sql: `SELECT a.{{COLUMN_1}}, b.{{COLUMN_2}}
FROM {{TABLE_A}} a
INNER JOIN {{TABLE_B}} b
  ON a.{{JOIN_KEY_A}} = b.{{JOIN_KEY_B}};`,
  },
  {
    id: "left-join",
    category: "join",
    titleHi: "Left join",
    titleEn: "LEFT JOIN",
    descHi: "बाएँ टेबल की सभी rows + मिलती हुई दाहिनी rows।",
    sql: `SELECT a.{{COLUMN_1}}, b.{{COLUMN_2}}
FROM {{TABLE_A}} a
LEFT JOIN {{TABLE_B}} b
  ON a.{{JOIN_KEY_A}} = b.{{JOIN_KEY_B}};`,
  },
  {
    id: "merge",
    category: "oracle",
    titleHi: "Upsert (MERGE)",
    titleEn: "Oracle MERGE",
    descHi: "अगर row है तो UPDATE, नहीं तो INSERT — Oracle की खास feature।",
    sql: `MERGE INTO {{TARGET_TABLE}} t
USING (SELECT {{KEY_VALUE}} AS {{KEY_COLUMN}}, {{VALUE_1}} AS {{COLUMN_1}} FROM dual) s
ON (t.{{KEY_COLUMN}} = s.{{KEY_COLUMN}})
WHEN MATCHED THEN
  UPDATE SET t.{{COLUMN_1}} = s.{{COLUMN_1}}
WHEN NOT MATCHED THEN
  INSERT ({{KEY_COLUMN}}, {{COLUMN_1}})
  VALUES (s.{{KEY_COLUMN}}, s.{{COLUMN_1}});

COMMIT;`,
  },
  {
    id: "sequence",
    category: "oracle",
    titleHi: "Auto ID (SEQUENCE)",
    titleEn: "Sequence + nextval",
    descHi: "Oracle में auto-increment के लिए sequence बनाएँ।",
    sql: `CREATE SEQUENCE {{SEQ_NAME}}
  START WITH 1
  INCREMENT BY 1
  NOCACHE;

INSERT INTO {{TABLE_NAME}} ({{ID_COLUMN}}, {{NAME_COLUMN}})
VALUES ({{SEQ_NAME}}.NEXTVAL, {{NAME_VALUE}});

COMMIT;`,
  },
  {
    id: "nvl",
    category: "oracle",
    titleHi: "NULL की जगह default",
    titleEn: "NVL / NVL2",
    descHi: "खाली value आने पर fallback दिखाएँ।",
    sql: `SELECT {{COLUMN_1}},
       NVL({{COLUMN_2}}, '{{DEFAULT_TEXT}}') AS {{COLUMN_2}}
FROM {{TABLE_NAME}};`,
  },
  {
    id: "dual",
    category: "oracle",
    titleHi: "Expression टेस्ट (DUAL)",
    titleEn: "Select from DUAL",
    descHi: "बिना टेबल के expression / date / sequence चेक करें।",
    sql: `SELECT {{EXPRESSION}} AS RESULT
FROM dual;`,
    tips: ["Example: SYSDATE, USER, 1+1, 'hello'"],
  },
  {
    id: "describe-cols",
    category: "meta",
    titleHi: "टेबल के columns देखें",
    titleEn: "List columns",
    descHi: "किसी भी schema में table structure जानने के लिए।",
    sql: `SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = UPPER('{{TABLE_NAME}}')
ORDER BY column_id;`,
  },
  {
    id: "list-tables",
    category: "meta",
    titleHi: "अपने सभी टेबल लिस्ट करें",
    titleEn: "List my tables",
    descHi: "Current user के tables — कोई placeholder नहीं बदलना।",
    sql: `SELECT table_name
FROM user_tables
ORDER BY table_name;`,
  },
];

export const PLACEHOLDER_HINTS: Record<string, string> = {
  TABLE_NAME: "अपना टेबल नाम (जैसे EMPLOYEES)",
  TABLE_A: "पहला टेबल",
  TABLE_B: "दूसरा टेबल",
  TARGET_TABLE: "जिस टेबल में merge करना है",
  COLUMN_1: "पहला column",
  COLUMN_2: "दूसरा column",
  COLUMN_3: "तीसरा column",
  FILTER_COLUMN: "जिस column पर शर्त लगे",
  FILTER_VALUE: "शर्त की value (text हो तो 'quotes')",
  SEARCH_COLUMN: "जिस column में खोजनी है",
  SEARCH_TEXT: "खोज का शब्द",
  SORT_COLUMN: "जिस column से sort करना है",
  GROUP_COLUMN: "जिस column से group करना है",
  N: "कितनी rows (जैसे 10)",
  VALUE_1: "पहली value",
  VALUE_2: "दूसरी value",
  VALUE_3: "तीसरी value",
  NEW_VALUE: "नई value",
  ID_COLUMN: "Primary key column (जैसे EMP_ID)",
  NAME_COLUMN: "Name वाला column",
  STATUS_COLUMN: "Status वाला column",
  CREATED_AT: "Date वाला column",
  JOIN_KEY_A: "टेबल A की join key",
  JOIN_KEY_B: "टेबल B की join key",
  KEY_COLUMN: "Unique key column",
  KEY_VALUE: "Key की value",
  SEQ_NAME: "Sequence का नाम (जैसे EMP_SEQ)",
  NAME_VALUE: "Name की value",
  DEFAULT_TEXT: "NULL आने पर दिखाने वाला text",
  EXPRESSION: "कोई expression (जैसे SYSDATE)",
};
