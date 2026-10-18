"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "./Providers";

export default function Header() {
  const { user, ready, logout, wishlist, theme, toggleTheme } = useApp();
  const path = usePathname();
  const link = (href: string, label: string) => (
    <Link href={href} className={path === href ? "active" : ""}>{label}</Link>
  );
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="brand">BookMart</Link>
        <nav aria-label="Үндсэн цэс">
          {link("/", "Нүүр")}
          {link("/books", "Номууд")}
          {link("/about", "Тухай")}
          {user && link("/wishlist", `Хадгалсан (${wishlist.length})`)}
        </nav>
        <div className="actions">
          <button className="ghost" onClick={toggleTheme} aria-label="Харагдах байдал солих">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          {ready && (user ? (
            <>
              <span className="who">{user.name}</span>
              <button className="ghost" onClick={logout}>Гарах</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn ghost">Нэвтрэх</Link>
              <Link href="/register" className="btn">Бүртгүүлэх</Link>
            </>
          ))}
        </div>
      </div>
    </header>
  );
}
