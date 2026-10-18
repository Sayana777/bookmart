"use client";
import { useMemo, useState } from "react";
import { books, categories } from "@/data/books";
import BookCard from "@/components/BookCard";
import Pagination from "@/components/Pagination";

const pageSize = 6;

export default function CatalogClient() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter(
      (b) => (!category || b.category === category) && (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    );
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  return (
    <>
      <div className="filters">
        <input type="search" placeholder="Нэр эсвэл зохиогчоор хайх" value={query} aria-label="Хайх"
          onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        <select value={category} aria-label="Ангилал" onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
          <option value="">Бүх ангилал</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {visible.length === 0 ? (
        <p className="empty">Хайлтад тохирох ном олдсонгүй. Өөр түлхүүр үг эсвэл ангилал сонгоно уу.</p>
      ) : (
        <div className="grid">{visible.map((b) => <BookCard key={b.id} book={b} />)}</div>
      )}
      <Pagination page={safePage} totalPages={totalPages} onChange={(p) => setPage(Math.min(Math.max(1, p), totalPages))} />
    </>
  );
}
