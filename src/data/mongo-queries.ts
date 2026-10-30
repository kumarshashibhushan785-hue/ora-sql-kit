import type { CategoryTab, QueryTemplate } from "@/data/types";

export const MONGO_CATEGORIES: CategoryTab[] = [
  { id: "all", labelHi: "सभी", labelEn: "All" },
  { id: "read", labelHi: "Find / Read", labelEn: "Read" },
  { id: "write", labelHi: "Insert / Update", labelEn: "Write" },
  { id: "delete", labelHi: "Delete", labelEn: "Delete" },
  { id: "agg", labelHi: "Aggregate", labelEn: "Agg" },
  { id: "index", labelHi: "Index / Meta", labelEn: "Meta" },
];

/**
 * MongoDB Compass → Mongosh shell में चलने वाले JS templates.
 * लाल {{PLACEHOLDER}} ही बदलो — बाकी वैसा ही छोड़ो।
 */
export const MONGO_QUERIES: QueryTemplate[] = [
  {
    id: "use-db",
    category: "meta",
    titleHi: "Database चुनें",
    titleEn: "use database",
    descHi: "Compass shell में सबसे पहले सही DB select करें।",
    sql: `use {{DB_NAME}}`,
  },
  {
    id: "show-collections",
    category: "meta",
    titleHi: "सभी collections लिस्ट",
    titleEn: "show collections",
    descHi: "Current database की collections देखें।",
    sql: `show collections`,
  },
  {
    id: "find-all",
    category: "read",
    titleHi: "सभी documents",
    titleEn: "find all",
    descHi: "Collection का पूरा data निकालने की सबसे आम command।",
    sql: `db.{{COLLECTION}}.find()`,
  },
  {
    id: "find-pretty",
    category: "read",
    titleHi: "सुंदर format में देखें",
    titleEn: "find + pretty",
    descHi: "Shell में पढ़ने लायक output।",
    sql: `db.{{COLLECTION}}.find().pretty()`,
  },
  {
    id: "find-fields",
    category: "read",
    titleHi: "खास fields ही लाएँ",
    titleEn: "projection",
    descHi: "सिर्फ जरूरी fields — 1 = दिखाओ, 0 = छुपाओ।",
    sql: `db.{{COLLECTION}}.find(
  {},
  { {{FIELD_1}}: 1, {{FIELD_2}}: 1, _id: 0 }
)`,
  },
  {
    id: "find-where",
    category: "read",
    titleHi: "शर्त से filter",
    titleEn: "find with filter",
    descHi: "एक field की value से documents छानें।",
    sql: `db.{{COLLECTION}}.find({
  {{FILTER_FIELD}}: {{FILTER_VALUE}}
})`,
    tips: [
      'Text हो तो quotes: "ACTIVE"',
      "Number बिना quotes: 101",
      'ObjectId: ObjectId("64f...")',
    ],
  },
  {
    id: "find-like",
    category: "read",
    titleHi: "Text खोजें (regex)",
    titleEn: "LIKE / regex",
    descHi: "नाम या आंशिक match — SQL LIKE जैसा।",
    sql: `db.{{COLLECTION}}.find({
  {{SEARCH_FIELD}}: /{{SEARCH_TEXT}}/i
})`,
  },
  {
    id: "find-one",
    category: "read",
    titleHi: "एक document",
    titleEn: "findOne",
    descHi: "पहला matching document।",
    sql: `db.{{COLLECTION}}.findOne({
  {{FILTER_FIELD}}: {{FILTER_VALUE}}
})`,
  },
  {
    id: "find-sort-limit",
    category: "read",
    titleHi: "Sort + top N",
    titleEn: "sort + limit",
    descHi: "नए/बड़े values पहले, सीमित rows।",
    sql: `db.{{COLLECTION}}.find()
  .sort({ {{SORT_FIELD}}: -1 })
  .limit({{N}})`,
    tips: ["1 = ascending, -1 = descending"],
  },
  {
    id: "count",
    category: "read",
    titleHi: "कुल documents गिनें",
    titleEn: "countDocuments",
    descHi: "Collection या filter के बाद count।",
    sql: `db.{{COLLECTION}}.countDocuments({
  {{FILTER_FIELD}}: {{FILTER_VALUE}}
})`,
  },
  {
    id: "insert-one",
    category: "write",
    titleHi: "एक document डालें",
    titleEn: "insertOne",
    descHi: "नया record add करने की standard command।",
    sql: `db.{{COLLECTION}}.insertOne({
  {{FIELD_1}}: {{VALUE_1}},
  {{FIELD_2}}: {{VALUE_2}},
  {{FIELD_3}}: {{VALUE_3}}
})`,
  },
  {
    id: "insert-many",
    category: "write",
    titleHi: "कई documents एक साथ",
    titleEn: "insertMany",
    descHi: "एक से ज़्यादा rows एक command में।",
    sql: `db.{{COLLECTION}}.insertMany([
  { {{FIELD_1}}: {{VALUE_1}}, {{FIELD_2}}: {{VALUE_2}} },
  { {{FIELD_1}}: {{VALUE_3}}, {{FIELD_2}}: {{VALUE_4}} }
])`,
  },
  {
    id: "update-one",
    category: "write",
    titleHi: "एक document अपडेट",
    titleEn: "updateOne + $set",
    descHi: "Matching पहला document update — $set से field बदलें।",
    sql: `db.{{COLLECTION}}.updateOne(
  { {{FILTER_FIELD}}: {{FILTER_VALUE}} },
  { $set: { {{FIELD_1}}: {{NEW_VALUE}} } }
)`,
  },
  {
    id: "update-many",
    category: "write",
    titleHi: "कई documents अपडेट",
    titleEn: "updateMany",
    descHi: "सभी matching documents पर वही बदलाव।",
    sql: `db.{{COLLECTION}}.updateMany(
  { {{FILTER_FIELD}}: {{FILTER_VALUE}} },
  { $set: { {{FIELD_1}}: {{NEW_VALUE}} } }
)`,
  },
  {
    id: "delete-one",
    category: "delete",
    titleHi: "एक document हटाएँ",
    titleEn: "deleteOne",
    descHi: "हमेशा filter रखें।",
    sql: `db.{{COLLECTION}}.deleteOne({
  {{FILTER_FIELD}}: {{FILTER_VALUE}}
})`,
  },
  {
    id: "delete-many",
    category: "delete",
    titleHi: "कई documents हटाएँ",
    titleEn: "deleteMany",
    descHi: "Filter के बिना सारा data मिट सकता है — सावधान।",
    sql: `db.{{COLLECTION}}.deleteMany({
  {{FILTER_FIELD}}: {{FILTER_VALUE}}
})`,
  },
  {
    id: "aggregate-group",
    category: "agg",
    titleHi: "Group करके गिनें",
    titleEn: "aggregate $group",
    descHi: "SQL GROUP BY जैसा — field के हिसाब से count।",
    sql:
      'db.{{COLLECTION}}.aggregate([\n' +
      "  {\n" +
      "    $group: {\n" +
      '      _id: "${{GROUP_FIELD}}",\n' +
      "      total: { $sum: 1 }\n" +
      "    }\n" +
      "  },\n" +
      "  { $sort: { total: -1 } }\n" +
      "])",
    tips: ["GROUP_FIELD में सिर्फ नाम लिखें (जैसे status) — $ अपने आप लगेगा"],
  },
  {
    id: "create-index",
    category: "index",
    titleHi: "Index बनाएँ",
    titleEn: "createIndex",
    descHi: "तेज़ search के लिए field पर index।",
    sql: `db.{{COLLECTION}}.createIndex({
  {{INDEX_FIELD}}: 1
})`,
  },
  {
    id: "drop-collection",
    category: "index",
    titleHi: "Collection हटाएँ",
    titleEn: "drop",
    descHi: "पूरा collection मिट जाता है — सोच-समझकर।",
    sql: `db.{{COLLECTION}}.drop()`,
  },
];

export const MONGO_PLACEHOLDER_HINTS: Record<string, string> = {
  DB_NAME: "Database नाम (जैसे myapp)",
  COLLECTION: "Collection नाम (जैसे users / employees)",
  FIELD_1: "पहला field (जैसे name)",
  FIELD_2: "दूसरा field (जैसे email)",
  FIELD_3: "तीसरा field (जैसे age)",
  VALUE_1: "पहली value",
  VALUE_2: "दूसरी value",
  VALUE_3: "तीसरी value",
  VALUE_4: "चौथी value",
  FILTER_FIELD: "जिस field पर शर्त लगे",
  FILTER_VALUE: 'शर्त की value (text हो तो "quotes")',
  SEARCH_FIELD: "जिस field में खोजना है",
  SEARCH_TEXT: "खोज का शब्द",
  SORT_FIELD: "जिस field से sort करना है",
  GROUP_FIELD: "जिस field से group करना है (बिना $)",
  INDEX_FIELD: "Index वाला field",
  NEW_VALUE: "नई value",
  N: "कितने documents (जैसे 10)",
};
