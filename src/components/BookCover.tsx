"use client";
import { useState } from "react";
import type { Book } from "@/data/books";

export default function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`cover${large ? " large" : ""}`}>
      {failed ? (
        <div className="cover-fallback" role="img" aria-label={`${book.title} — зураг ачаалагдсангүй`}>
          <strong>{book.title}</strong>
          <span>{book.author}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={book.coverUrl} alt={`${book.title} номын хавтас`} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
}
