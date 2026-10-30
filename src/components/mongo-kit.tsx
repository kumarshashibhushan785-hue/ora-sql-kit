"use client";

import { useMemo, useState } from "react";
import { QueryCard } from "@/components/query-card";
import { Button } from "@/components/ui/button";
import {
  MONGO_CATEGORIES,
  MONGO_PLACEHOLDER_HINTS,
  MONGO_QUERIES,
} from "@/data/mongo-queries";

const GLOBAL_KEYS = [
  { key: "COLLECTION", label: "Collection", placeholder: "users" },
  { key: "FIELD_1", label: "Field 1", placeholder: "name" },
  { key: "FIELD_2", label: "Field 2", placeholder: "email" },
  { key: "FIELD_3", label: "Field 3", placeholder: "age" },
] as const;

export function MongoKit() {
  const [category, setCategory] = useState("all");
  const [globals, setGlobals] = useState<Record<string, string>>({
    COLLECTION: "",
    FIELD_1: "",
    FIELD_2: "",
    FIELD_3: "",
  });

  const filtered = useMemo(
    () =>
      category === "all"
        ? MONGO_QUERIES
        : MONGO_QUERIES.filter((q) => q.category === category),
    [category]
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
      <header className="hero hero-mongo relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="hero-grid" aria-hidden />
        <p className="brand-mark brand-mark-mongo animate-rise">
          Mongo Shell Kit
        </p>
        <h1 className="font-display mt-3 max-w-xl text-4xl leading-[1.05] text-white sm:text-5xl animate-rise delay-1">
          लाल हिस्से बदलो — JS तैयार
        </h1>
        <p className="mt-4 max-w-lg text-base text-white/75 sm:text-lg animate-rise delay-2">
          MongoDB Compass के <strong className="text-white">Mongosh</strong>{" "}
          shell में चलने वाले JavaScript templates। सिर्फ{" "}
          <span className="sql-mark-on-dark">COLLECTION</span> और{" "}
          <span className="sql-mark-on-dark">FIELD</span> बदलें — copy करके
          Compass में paste करो।
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 animate-rise delay-3">
          <a href="#mongo-templates" className="cta-mongo">
            Templates देखें
          </a>
          <span className="text-sm text-white/60">
            लाल = ज़रूरी बदलाव · बाकी JS वैसा ही छोड़ दें
          </span>
        </div>
      </header>

      <section className="legend mt-8" aria-label="Legend">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <span className="inline-flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
            <span className="sql-mark px-2 py-1">COLLECTION</span>
            लाल = अभी बदलना बाकी
          </span>
          <span className="inline-flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
            <span className="sql-filled px-2 py-1 text-sm">users</span>
            हरा = आपने value भर दी
          </span>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-[color:var(--line)] bg-white/70 p-4 shadow-sm backdrop-blur sm:p-5">
        <h2 className="font-display text-lg text-[color:var(--ink)]">
          एक बार भरें — कई commands में लागू
        </h2>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          Compass में collection/field नाम यहाँ भरोगे तो नीचे templates में
          बैठ जाएँगे।
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

      <section id="mongo-templates" className="mt-10 scroll-mt-6">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Mongo categories"
        >
          {MONGO_CATEGORIES.map((cat) => {
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
              hints={MONGO_PLACEHOLDER_HINTS}
              copyLabel="JS Copy करें"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
