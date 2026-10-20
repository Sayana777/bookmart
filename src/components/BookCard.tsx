import Link from "next/link";
import type { Book } from "@/data/books";
import BookCover from "./BookCover";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="book-card">
      <Link href={`/books/${book.id}`} aria-label={`${book.title} — дэлгэрэнгүй`}>
        <BookCover book={book} />
        <h3>{book.title}</h3>
      </Link>
      <p className="muted">{book.author}</p>
      <p className="tag">{book.category}</p>
      <p className="price">{book.price.toLocaleString()}₮</p>
    </article>
  );
}