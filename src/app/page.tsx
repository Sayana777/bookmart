import Link from "next/link";
import { books, categories } from "@/data/books";
import BookCard from "@/components/BookCard";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Learn. Build. Create.</h1>
        <p>Programming болон web development номыг нэг дороос.</p>
        <Link className="btn" href="/books">Номууд үзэх</Link>
      </section>
      <section>
        <h2>Ангилал</h2>
        <ul className="chips">
          {categories.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>
      <section>
        <h2>Онцлох номууд</h2>
        <div className="grid">{books.slice(0, 4).map((b) => <BookCard key={b.id} book={b} />)}</div>
      </section>
    </>
  );
}
