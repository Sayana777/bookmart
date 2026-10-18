// Зөвхөн client талд ашиглана. Алдаа гарвал fallback буцаана.
export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage дүүрсэн эсвэл хаалттай үед UI унахгүй */
  }
}

export function removeKey(key: string) {
  try { window.localStorage.removeItem(key); } catch { /* ignore */ }
}
