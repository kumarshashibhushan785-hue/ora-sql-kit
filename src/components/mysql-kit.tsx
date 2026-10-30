"use client";

import { useMemo, useState } from "react";
import { QueryCard } from "@/components/query-card";
import { Button } from "@/components/ui/button";
import {
  MYSQL_CATEGORIES,
  MYSQL_PLACEHOLDER_HINTS,
  MYSQL_QUERIES,
} from "@/data/mysql-queries";

const GLOBAL_KEYS = [
  { key: "TABLE_NAME", label: "टेबल नाम", placeholder: "employees" },
  { key: "COLUMN_1", label: "Column 1", placeholder: "emp_id" },
  { key: "COLUMN_2", label: "Column 2", placeholder: "emp_name" },
  { key: "COLUMN_3", label: "Column 3", placeholder: "dept_id" },
] as const;

export function MysqlKit() {
  const [category, setCategory] = useState("all");
  const [globals, setGlobals] = useState<Record<string, string>>({
    TABLE_NAME: "",
    COLUMN_1: "",
    COLUMN_2: "",
    COLUMN_3: "",
  });

  const filtered = useMemo(
    () =>
      category === "all"
        ? MYSQL_QUERIES
        : MYSQL_QUERIES.filter((q) => q.category === category),
    [category]
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
      <header className="hero hero-mysql relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="hero-grid" aria-hidden />
        <p className="brand-mark brand-mark-mysql animate-rise">MySQL Kit</p>
        <h1 className="font-display mt-3 max-w-xl text-4xl leading-[1.05] text-white sm:text-5xl animate-rise delay-1">
          लाल हिस्से बदलो — query तैयार
        </h1>
        <p className="mt-4 max-w-lg text-base text-white/75 sm:text-lg animate-rise delay-2">
          MySQL 5.7 / 8.0, MariaDB, Workbench, phpMyAdmin पर चलने वाले
          templates। सिर्फ{" "}
          <span className="sql-mark-on-dark">TABLE</span> और{" "}
          <span className="sql-mark-on-dark">COLUMN</span> बदलें।
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 animate-rise delay-3">
          <a href="#mysql-templates" className="cta-primary">
            Templates देखें
          </a>
          <span className="text-sm text-white/60">
            लाल = ज़रूरी बदलाव · बाकी SQL वैसा ही छोड़ दें
          </span>
        </div>
      </header>

      <section className="legend mt-8" aria-label="Legend">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <span className="inline-flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
            <span className="sql-mark px-2 py-1">TABLE_NAME</span>
            लाल = अभी बदलना बाकी
          </span>
          <span className="inline-flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
            <span className="sql-filled px-2 py-1 text-sm">employees</span>
            हरा = आपने value भर दी
          </span>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[color:var(--line)] bg-white/70 p-4 shadow-sm backdrop-blur sm:p-5">
        <h2 className="font-display text-lg text-[color:var(--ink)]">
          एक बार भरें — कई queries में लागू
        </h2>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          ये values नीचे सभी templates में लाल जगह पर बैठ जाएँगी।
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

      <section id="mysql-templates" className="mt-10 scroll-mt-6">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="MySQL categories"
        >
          {MYSQL_CATEGORIES.map((cat) => {
            const selected = category === cat.id;
            return (
              <Button
                key={cat.id}
                type="button"
                size="sm"
                role="tab"
                aria-selected={selected}
                variant={selected ? "default" : "outline"}
                onClick={() => setCategory(cat.id)}
              >
                {cat.labelHi}
                <span className="sr-only"> ({cat.labelEn})</span>
              </Button>
            );
          })}
        </div>

        <div className="mt-6 space-y-4">
          {filtered.map((query) => (
            <QueryCard
              key={query.id}
              query={query}
              globalValues={globals}
              hints={MYSQL_PLACEHOLDER_HINTS}
              copyLabel="SQL Copy करें"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
