"use client";

import { useMemo, useState } from "react";
import { QueryCard } from "@/components/query-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES, QUERIES } from "@/data/oracle-queries";

const GLOBAL_KEYS = [
  { key: "TABLE_NAME", label: "टेबल नाम", placeholder: "EMPLOYEES" },
  { key: "COLUMN_1", label: "Column 1", placeholder: "EMP_ID" },
  { key: "COLUMN_2", label: "Column 2", placeholder: "EMP_NAME" },
  { key: "COLUMN_3", label: "Column 3", placeholder: "DEPT_ID" },
] as const;

export function OracleKit() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["id"]>(
    "all"
  );
  const [globals, setGlobals] = useState<Record<string, string>>({
    TABLE_NAME: "",
    COLUMN_1: "",
    COLUMN_2: "",
    COLUMN_3: "",
  });

  const filtered = useMemo(
    () =>
      category === "all"
        ? QUERIES
        : QUERIES.filter((q) => q.category === category),
    [category]
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
      <header className="hero relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="hero-grid" aria-hidden />
        <p className="brand-mark animate-rise">Oracle SQL Kit</p>
        <h1 className="font-display mt-3 max-w-xl text-4xl leading-[1.05] text-white sm:text-5xl animate-rise delay-1">
          लाल हिस्से बदलो — query तैयार
        </h1>
        <p className="mt-4 max-w-lg text-base text-white/75 sm:text-lg animate-rise delay-2">
          कोई भी Oracle database (11g से 21c, XE, Autonomous) पर चलने वाले
          ready templates। सिर्फ{" "}
          <span className="sql-mark-on-dark">TABLE</span> और{" "}
          <span className="sql-mark-on-dark">COLUMN</span> नाम बदलें।
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 animate-rise delay-3">
          <a href="#templates" className="cta-primary">
            Templates देखें
          </a>
          <span className="text-sm text-white/60">
            लाल = ज़रूरी बदलाव · बाकी SQL वैसा ही छोड़ दें
          </span>
        </div>
      </header>

      <section className="legend mt-8" aria-label="Legend">
        <div className="flex flex-wrap items-center gap-3">
          <span className="sql-mark px-2 py-1 text-sm">TABLE_NAME</span>
          <span className="text-sm text-[color:var(--muted)]">
            = लाल रंग वाले tokens ही आपकी जगह बदलने हैं। बाकी keywords
            (SELECT, FROM, WHERE…) मत छुएँ।
          </span>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[color:var(--line)] bg-white/70 p-4 shadow-sm backdrop-blur sm:p-5">
        <h2 className="font-display text-lg text-[color:var(--ink)]">
          एक बार भरें — कई queries में लागू
        </h2>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          ये values नीचे सभी templates में लाल जगह पर बैठ जाएँगी। खाली छोड़ें
          तो लाल placeholder ही दिखेगा।
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GLOBAL_KEYS.map((field) => (
            <label key={field.key} className="block space-y-1.5">
              <span className="text-xs font-medium text-[color:var(--ink)]">
                {field.label}{" "}
                <span className="sql-mark px-1 text-[10px]">{field.key}</span>
              </span>
              <input
                className="field"
                placeholder={field.placeholder}
                value={globals[field.key] ?? ""}
                onChange={(e) =>
                  setGlobals((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
              />
            </label>
          ))}
        </div>
      </section>

      <section id="templates" className="mt-10 scroll-mt-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={category === cat.id ? "default" : "outline"}
              onClick={() => setCategory(cat.id)}
            >
              {cat.labelHi}
            </Button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {filtered.map((query) => (
            <QueryCard
              key={query.id}
              query={query}
              globalValues={globals}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
