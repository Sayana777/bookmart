import Link from "next/link";
export default function NotFound() {
  return (
    <section className="empty">
      <h1>Хуудас олдсонгүй</h1>
      <p>Хаяг буруу эсвэл ном устсан байж магадгүй.</p>
      <Link className="btn" href="/books">Номууд руу буцах</Link>
    </section>
  );
}
