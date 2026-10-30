"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Login fail");
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError("Network error — दोबारा try करें");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-2xl border border-[color:var(--line)] bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
        <p className="font-display text-2xl text-[color:var(--ink)]">DB Query Kit</p>
        <h1 className="mt-2 text-lg text-[color:var(--ink)]">
          Password डालकर खोलें
        </h1>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          Link किसी के पास भी हो तो बिना password Kit नहीं खुलेगा।
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-[color:var(--ink)]">
              Password
            </span>
            <input
              className="field"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          {error ? (
            <p className="text-sm text-[color:var(--mark)]" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Checking…" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
