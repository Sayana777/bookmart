"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Book } from "@/data/books";
import { useApp } from "@/components/Providers";

export default function Reader({ book }: { book: Book }) {
  const { ready, user } = useApp();
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    fetch(book.pdfPath, { method: "HEAD" })
      .then((r) => alive && setExists(r.ok))
      .catch(() => alive && setExists(false));
    return () => { alive = false; };
  }, [user, book.pdfPath]);

  if (!ready) return <p className="muted">Ачаалж байна…</p>;
  if (!user) return (
    <div className="empty"><p>PDF унших бол нэвтэрсэн хэрэглэгчийн боломж.</p><Link className="btn" href="/login">Нэвтрэх</Link></div>
  );
  return (
    <>
      <p><Link href={`/books/${book.id}`}>← {book.title}</Link></p>
      {exists === false ? (
        <div className="empty">
          <h1>PDF файл олдсонгүй</h1>
          <p><code>public{book.pdfPath}</code> файлыг байрлуулж, нэр нь <code>pdfPath</code>-тай яг таарч байгаа эсэхийг шалгана уу.</p>
        </div>
      ) : (
        <iframe className="pdf" src={book.pdfPath} title={`${book.title} PDF уншигч`} />
      )}
    </>
  );
}
