import { notFound } from "next/navigation";
import { books, getBook } from "@/data/books";
import Reader from "./Reader";

export function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}

export default async function ReadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = getBook(id);
  if (!book) notFound();
  return <Reader book={book} />;
}
