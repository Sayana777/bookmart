"use client";
import Link from "next/link";
import { books } from "@/data/books";
import BookCard from "@/components/BookCard";
import { useApp } from "@/components/Providers";

export default function WishlistPage() {
  const { ready, user, wishlist } = useApp();
  if (!ready) return <p className="muted">Ачаалж байна…</p>;
  if (!user) return (
    <div className="empty"><p>Хадгалсан номоо харахын тулд нэвтэрнэ үү.</p><Link className="btn" href="/login">Нэвтрэх</Link></div>
  );
  const saved = wishlist.map((id) => books.find((b) => b.id === id)).filter((b): b is NonNullable<typeof b> => Boolean(b));
  return (
    <>
      <h1>Хадгалсан ном</h1>
      {saved.length === 0 ? (
        <div className="empty"><p>Одоогоор хадгалсан ном алга. Каталогоос ном сонгоод "Хадгалах" дарна уу.</p><Link className="btn" href="/books">Каталог руу очих</Link></div>
      ) : (
        <div className="grid">{saved.map((b) => <BookCard key={b.id} book={b} />)}</div>
      )}
    </>
  );
}
