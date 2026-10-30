export const AUTH_COOKIE = "dbkit_session";

function getPassword(): string {
  return process.env.SITE_PASSWORD?.trim() || "kit123";
}

function getSecret(): string {
  return (
    process.env.AUTH_SECRET?.trim() ||
    process.env.SITE_PASSWORD?.trim() ||
    "dbkit-dev-secret-change-me"
  );
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return toHex(sig);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

export function checkPassword(input: string): boolean {
  return safeEqual(input.normalize("NFC"), getPassword().normalize("NFC"));
}

export async function createSessionToken(): Promise<string> {
  const payload = `ok:${Date.now()}`;
  const sig = await hmacHex(getSecret(), payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  const i = token.lastIndexOf(".");
  if (i <= 0) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  if (!payload.startsWith("ok:")) return false;
  const expected = await hmacHex(getSecret(), payload);
  return safeEqual(sig, expected);
}
