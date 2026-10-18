"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useApp } from "./Providers";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { login, register } = useApp();
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isRegister = mode === "register";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    if (isRegister && name.length < 2) return setError("Нэр хамгийн багадаа 2 тэмдэгт байна.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Email хаягийг зөв оруулна уу.");
    if (password.length < 6) return setError("Нууц үг хамгийн багадаа 6 тэмдэгт байна.");
    setBusy(true);
    const res = isRegister ? await register(name, email, password) : await login(email, password);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    router.push("/books");
  }

  return (
    <form className="panel form" onSubmit={onSubmit} noValidate>
      <h1>{isRegister ? "Бүртгүүлэх" : "Нэвтрэх"}</h1>
      {isRegister && (
        <label>Нэр<input name="name" autoComplete="name" /></label>
      )}
      <label>Email<input name="email" type="email" autoComplete="email" /></label>
      <label>Нууц үг<input name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} /></label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn" disabled={busy}>{isRegister ? "Бүртгүүлэх" : "Нэвтрэх"}</button>
      <p className="muted small">Demo нэвтрэлт: мэдээлэл зөвхөн энэ browser-д хадгалагдана.</p>
      <p className="small">
        {isRegister ? <>Бүртгэлтэй юу? <Link href="/login">Нэвтрэх</Link></> : <>Бүртгэлгүй юу? <Link href="/register">Бүртгүүлэх</Link></>}
      </p>
    </form>
  );
}
