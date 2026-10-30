import type { CategoryTab, QueryTemplate } from "@/data/types";

export const MYSQL_CATEGORIES: CategoryTab[] = [
  { id: "all", labelHi: "सभी", labelEn: "All" },
  { id: "select", labelHi: "Select", labelEn: "SELECT" },
  { id: "dml", labelHi: "Insert / Update", labelEn: "DML" },
  { id: "ddl", labelHi: "Create Table", labelEn: "DDL" },
  { id: "join", labelHi: "Join", labelEn: "JOIN" },
  { id: "mysql", labelHi: "MySQL खास", labelEn: "MySQL" },
  { id: "meta", labelHi: "Metadata", labelEn: "Meta" },
];

/**
 * MySQL 5.7 / 8.0 / MariaDB / MySQL Workbench / phpMyAdmin.
 * लाल {{PLACEHOLDER}} ही बदलो।
 */
export const MYSQL_QUERIES: QueryTemplate[] = [
  {
    id: "use-db",
    category: "meta",
    titleHi: "Database चुनें",
    titleEn: "USE database",
    descHi: "Query चलाने से पहले सही database select करें।",
    sql: `USE {{DB_NAME}};`,
  },
  {
    id: "show-tables",
    category: "meta",
    titleHi: "सभी टेबल लिस्ट",
    titleEn: "SHOW TABLES",
    descHi: "Current database की tables — कोई नाम बदलना नहीं।",
    sql: `SHOW TABLES;`,
  },
  {
    id: "describe",
    category: "meta",
    titleHi: "टेबल के columns देखें",
    titleEn: "DESCRIBE",
    descHi: "Table structure जानने के लिए।",
    sql: `DESCRIBE {{TABLE_NAME}};`,
  },
  {
    id: "select-all",
    category: "select",
    titleHi: "सभी rows देखें",
    titleEn: "Select all rows",
    descHi: "टेबल का पूरा data निकालने की सबसे आम query।",
    sql: `SELECT *
FROM {{TABLE_NAME}};`,
  },
  {
    id: "select-columns",
    category: "select",
    titleHi: "खास columns चुनें",
    titleEn: "Select specific columns",
    descHi: "सिर्फ जरूरी fields ही लाएँ।",
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
      "Text value हो तो quotes: 'ACTIVE'",
      "Number बिना quotes: 101",
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
    id: "select-limit",
    category: "select",
    titleHi: "Sorted + top N rows",
    titleEn: "ORDER BY + LIMIT",
    descHi: "MySQL में LIMIT हर version पर चलता है।",
    sql: `SELECT {{COLUMN_1}}, {{COLUMN_2}}
FROM {{TABLE_NAME}}
ORDER BY {{SORT_COLUMN}} DESC
LIMIT {{N}};`,
  },
  {
    id: "select-aggregate",
    category: "select",
    titleHi: "Count / Group",
    titleEn: "COUNT + GROUP BY",
    descHi: "कुल गिनती निकालने के लिए।",
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
VALUES ({{VALUE_1}}, {{VALUE_2}}, {{VALUE_3}});`,
    tips: ["MySQL में autocommit अक्सर ON होता है — COMMIT ज़रूरी नहीं।"],
  },
  {
    id: "update-one",
    category: "dml",
    titleHi: "Row अपडेट करें",
    titleEn: "Update rows",
    descHi: "WHERE के बिना UPDATE पूरा टेबल बदल देगा।",
    sql: `UPDATE {{TABLE_NAME}}
SET {{COLUMN_1}} = {{NEW_VALUE}}
WHERE {{FILTER_COLUMN}} = {{FILTER_VALUE}};`,
  },
  {
    id: "delete-one",
    category: "dml",
    titleHi: "Row हटाएँ",
    titleEn: "Delete rows",
    descHi: "हमेशा WHERE रखें।",
    sql: `DELETE FROM {{TABLE_NAME}}
WHERE {{FILTER_COLUMN}} = {{FILTER_VALUE}};`,
  },
  {
    id: "create-table",
    category: "ddl",
    titleHi: "नया टेबल बनाएँ",
    titleEn: "Create table",
    descHi: "AUTO_INCREMENT के साथ basic MySQL table।",
    sql: `CREATE TABLE {{TABLE_NAME}} (
  {{ID_COLUMN}}     INT          NOT NULL AUTO_INCREMENT,
  {{NAME_COLUMN}}   VARCHAR(100) NOT NULL,
  {{STATUS_COLUMN}} VARCHAR(20)  DEFAULT 'ACTIVE',
  {{CREATED_AT}}    DATETIME     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ({{ID_COLUMN}})
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
    id: "upsert",
    category: "mysql",
    titleHi: "Upsert (duplicate पर update)",
    titleEn: "INSERT … ON DUPLICATE KEY UPDATE",
    descHi: "अगर unique key पहले से है तो UPDATE, नहीं तो INSERT।",
    sql: `INSERT INTO {{TABLE_NAME}} ({{KEY_COLUMN}}, {{COLUMN_1}})
VALUES ({{KEY_VALUE}}, {{VALUE_1}})
ON DUPLICATE KEY UPDATE
  {{COLUMN_1}} = {{VALUE_1}};`,
  },
  {
    id: "ifnull",
    category: "mysql",
    titleHi: "NULL की जगह default",
    titleEn: "IFNULL",
    descHi: "खाली value आने पर fallback दिखाएँ।",
    sql: `SELECT {{COLUMN_1}},
       IFNULL({{COLUMN_2}}, '{{DEFAULT_TEXT}}') AS {{COLUMN_2}}
FROM {{TABLE_NAME}};`,
  },
  {
    id: "now",
    category: "mysql",
    titleHi: "आज की date / time",
    titleEn: "NOW()",
    descHi: "बिना टेबल के current datetime चेक करें।",
    sql: `SELECT NOW() AS {{ALIAS_NAME}};`,
    tips: ["ALIAS_NAME उदाहरण: CURRENT_TIME"],
  },
  {
    id: "transaction",
    category: "mysql",
    titleHi: "Transaction (COMMIT)",
    titleEn: "START TRANSACTION",
    descHi: "कई बदलाव एक साथ save या rollback।",
    sql: `START TRANSACTION;

UPDATE {{TABLE_NAME}}
SET {{COLUMN_1}} = {{NEW_VALUE}}
WHERE {{FILTER_COLUMN}} = {{FILTER_VALUE}};

COMMIT;`,
  },
];

export const MYSQL_PLACEHOLDER_HINTS: Record<string, string> = {
  DB_NAME: "Database नाम (जैसे myapp)",
  TABLE_NAME: "अपना टेबल नाम (जैसे employees)",
  TABLE_A: "पहला टेबल",
  TABLE_B: "दूसरा टेबल",
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
  ID_COLUMN: "Primary key column (जैसे emp_id)",
  NAME_COLUMN: "Name वाला column",
  STATUS_COLUMN: "Status वाला column",
  CREATED_AT: "Date वाला column",
  JOIN_KEY_A: "टेबल A की join key",
  JOIN_KEY_B: "टेबल B की join key",
  KEY_COLUMN: "Unique key column",
  KEY_VALUE: "Key की value",
  DEFAULT_TEXT: "NULL आने पर दिखाने वाला text",
  ALIAS_NAME: "Result का नाम (जैसे CURRENT_TIME)",
};
