"use client";
import Link from "next/link";
import { useApp } from "./Providers";

export default function BookActions({ bookId }: { bookId: string }) {
  const { user, ready, wishlist, toggleWishlist, ratings, setRating } = useApp();
  if (!ready) return <p className="muted">Ачаалж байна…</p>;
  if (!user) {
    return (
      <div className="panel">
        <p>PDF унших, номыг хадгалах, үнэлгээ өгөхийн тулд нэвтэрнэ үү.</p>
        <Link className="btn" href="/login">Нэвтрэх</Link>
      </div>
    );
  }
  const saved = wishlist.includes(bookId);
  const current = ratings[bookId] ?? 0;
  return (
    <div className="panel">
      <div className="row">
        <Link className="btn" href={`/read/${bookId}`}>PDF унших</Link>
        <button className={saved ? "btn on" : "btn ghost"} onClick={() => toggleWishlist(bookId)} aria-pressed={saved}>
          {saved ? "Хадгалсан" : "Хадгалах"}
        </button>
      </div>
      <div className="rating" role="radiogroup" aria-label="Үнэлгээ">
        <span>Таны үнэлгээ:</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} role="radio" aria-checked={current === n} aria-label={`${n} од`} className={n <= current ? "star on" : "star"} onClick={() => setRating(bookId, n)}>
            ★
          </button>
        ))}
        <span className="muted">{current ? `${current}/5` : "үнэлээгүй"}</span>
      </div>
    </div>
  );
}
