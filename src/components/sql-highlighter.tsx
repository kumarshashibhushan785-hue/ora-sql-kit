"use client";

import { PLACEHOLDER_HINTS } from "@/data/oracle-queries";

const TOKEN_RE = /(\{\{[A-Z0-9_]+\}\})/g;

type Props = {
  sql: string;
  /** Live overrides: placeholder key → user value */
  values?: Record<string, string>;
};

export function SqlHighlighter({ sql, values = {} }: Props) {
  const parts = sql.split(TOKEN_RE);

  return (
    <pre className="sql-block overflow-x-auto rounded-lg p-4 text-[13px] leading-6 sm:text-sm sm:leading-7">
      <code>
        {parts.map((part, i) => {
          const match = part.match(/^\{\{([A-Z0-9_]+)\}\}$/);
          if (!match) {
            return <span key={i}>{part}</span>;
          }
          const key = match[1];
          const override = values[key]?.trim();
          const hint = PLACEHOLDER_HINTS[key] ?? "इसे बदलें";
          if (override) {
            return (
              <span
                key={i}
                className="sql-filled"
                title={`${key}: ${hint}`}
              >
                {override}
              </span>
            );
          }
          return (
            <mark
              key={i}
              className="sql-mark"
              title={`${key}: ${hint}`}
            >
              {key}
            </mark>
          );
        })}
      </code>
    </pre>
  );
}

export function sqlPlainText(
  sql: string,
  values: Record<string, string> = {}
): string {
  return sql.replace(TOKEN_RE, (_, token: string) => {
    const key = token.slice(2, -2);
    const override = values[key]?.trim();
    return override || key;
  });
}

export function extractPlaceholders(sql: string): string[] {
  const found = new Set<string>();
  for (const m of sql.matchAll(/\{\{([A-Z0-9_]+)\}\}/g)) {
    found.add(m[1]);
  }
  return Array.from(found);
}
