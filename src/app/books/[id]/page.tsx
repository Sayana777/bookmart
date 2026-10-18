import Link from "next/link";
import { notFound } from "next/navigation";
import { books, getBook } from "@/data/books";
import BookCover from "@/components/BookCover";
import BookActions from "@/components/BookActions";

export function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}

export default async function BookDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = getBook(id);
  if (!book) notFound();
  return (
    <>
      <p><Link href="/books">← Бүх ном</Link></p>
      <div className="detail">
        <BookCover book={book} large />
        <div>
          <h1>{book.title}</h1>
          <p className="muted">{book.author} · {book.year}</p>
          <p className="tag">{book.category}</p>
          <p>{book.description}</p>
          <BookActions bookId={book.id} />
        </div>
      </div>
    </>
  );
}
