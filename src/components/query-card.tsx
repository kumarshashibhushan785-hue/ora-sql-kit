"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SqlHighlighter,
  extractPlaceholders,
  sqlPlainText,
} from "@/components/sql-highlighter";
import {
  PLACEHOLDER_HINTS,
  type QueryTemplate,
} from "@/data/oracle-queries";

type Props = {
  query: QueryTemplate;
  globalValues: Record<string, string>;
};

export function QueryCard({ query, globalValues }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [local, setLocal] = useState<Record<string, string>>({});

  const placeholders = useMemo(
    () => extractPlaceholders(query.sql),
    [query.sql]
  );

  const values = useMemo(
    () => ({ ...globalValues, ...local }),
    [globalValues, local]
  );

  async function copySql() {
    const text = sqlPlainText(query.sql, values);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <article className="query-card group">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg text-[color:var(--ink)] sm:text-xl">
              {query.titleHi}
            </h3>
            <span className="text-xs text-[color:var(--muted)]">
              {query.titleEn}
            </span>
          </div>
          <p className="text-sm text-[color:var(--muted)]">{query.descHi}</p>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-[color:var(--muted)] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className="mt-4">
        <SqlHighlighter sql={query.sql} values={values} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={copySql}>
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copy हो गया" : "SQL Copy करें"}
        </Button>
        {placeholders.length > 0 ? (
          <Badge variant="alert">
            {placeholders.length} लाल हिस्से बदलें
          </Badge>
        ) : (
          <Badge variant="secondary">कोई बदलाव नहीं — सीधे चलाएँ</Badge>
        )}
      </div>

      {open && placeholders.length > 0 && (
        <div className="mt-4 grid gap-3 border-t border-[color:var(--line)] pt-4 sm:grid-cols-2">
          {placeholders.map((key) => (
            <label key={key} className="block space-y-1.5">
              <span className="flex items-center gap-2 text-xs font-medium">
                <span className="sql-mark px-1.5 py-0.5 text-[11px]">{key}</span>
                <span className="text-[color:var(--muted)]">
                  {PLACEHOLDER_HINTS[key] ?? "अपनी value लिखें"}
                </span>
              </span>
              <input
                className="field"
                placeholder={key}
                value={local[key] ?? ""}
                onChange={(e) =>
                  setLocal((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </label>
          ))}
        </div>
      )}

      {open && query.tips && query.tips.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-[color:var(--muted)]">
          {query.tips.map((tip) => (
            <li key={tip}>• {tip}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
