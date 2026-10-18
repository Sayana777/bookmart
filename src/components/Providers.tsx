"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { books } from "@/data/books";
import { readJSON, writeJSON, removeKey } from "@/lib/storage";

type User = { name: string; email: string };
type StoredUser = User & { passwordHash: string };
type Result = { ok: true } | { ok: false; error: string };

type Ctx = {
  ready: boolean;
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<Result>;
  login: (email: string, password: string) => Promise<Result>;
  logout: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  ratings: Record<string, number>;
  setRating: (id: string, value: number) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const AppCtx = createContext<Ctx | null>(null);
export const useApp = () => {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used inside <Providers>");
  return c;
};

// Demo: нууц үгийг SHA-256 hash болгож хадгална. Энэ нь production authentication БИШ.
async function hash(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const isRating = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 5;

function cleanWishlist(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const valid = new Set(books.map((b) => b.id));
  return Array.from(new Set(raw.filter((x): x is string => typeof x === "string" && valid.has(x))));
}

function cleanRatings(raw: unknown): Record<string, number> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) if (isRating(v)) out[k] = v;
  return out;
}

const wKey = (email: string) => `bm_wishlist:${email}`;
const rKey = (email: string) => `bm_ratings:${email}`;

export default function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const loadUserData = useCallback((u: User | null) => {
    setUser(u);
    setWishlist(u ? cleanWishlist(readJSON(wKey(u.email), [])) : []);
    setRatings(u ? cleanRatings(readJSON(rKey(u.email), {})) : {});
  }, []);

  useEffect(() => {
    const t = readJSON<string>("bm_theme", "light");
    setTheme(t === "dark" ? "dark" : "light");
    const session = readJSON<User | null>("bm_session", null);
    loadUserData(session && typeof session.email === "string" ? session : null);
    setReady(true);
  }, [loadUserData]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    writeJSON("bm_theme", next);
  };

  const register: Ctx["register"] = async (name, email, password) => {
    const users = readJSON<StoredUser[]>("bm_users", []);
    const e = email.trim().toLowerCase();
    if (users.some((u) => u.email === e)) return { ok: false, error: "Энэ email-ээр өмнө нь бүртгүүлсэн байна." };
    const u: StoredUser = { name: name.trim(), email: e, passwordHash: await hash(password) };
    writeJSON("bm_users", [...users, u]);
    const session = { name: u.name, email: u.email };
    writeJSON("bm_session", session);
    loadUserData(session);
    return { ok: true };
  };

  const login: Ctx["login"] = async (email, password) => {
    const users = readJSON<StoredUser[]>("bm_users", []);
    const e = email.trim().toLowerCase();
    const found = users.find((u) => u.email === e);
    if (!found || found.passwordHash !== (await hash(password)))
      return { ok: false, error: "Email эсвэл нууц үг буруу байна." };
    const session = { name: found.name, email: found.email };
    writeJSON("bm_session", session);
    loadUserData(session);
    return { ok: true };
  };

  const logout = () => {
    removeKey("bm_session");
    loadUserData(null);
  };

  const toggleWishlist = (id: string) => {
    if (!user) return;
    const next = wishlist.includes(id) ? wishlist.filter((x) => x !== id) : [...wishlist, id];
    setWishlist(next);
    writeJSON(wKey(user.email), next);
  };

  const setRating = (id: string, value: number) => {
    if (!user || !isRating(value)) return;
    const next = { ...ratings, [id]: value };
    setRatings(next);
    writeJSON(rKey(user.email), next);
  };

  return (
    <AppCtx.Provider value={{ ready, user, register, login, logout, wishlist, toggleWishlist, ratings, setRating, theme, toggleTheme }}>
      {children}
    </AppCtx.Provider>
  );
}
