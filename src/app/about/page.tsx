export default function About() {
  return (
    <section className="prose">
      <h1>BookMart-ын тухай</h1>
      <p>Энэ бол Next.js App Router ба TypeScript сурахад зориулсан demo сайт юм. API, database ашиглаагүй: номын дата <code>src/data/books.ts</code> файлд, PDF-үүд <code>public/pdfs</code> хавтсанд, хэрэглэгчийн төлөв browser-ийн localStorage-д хадгалагдана.</p>
      <p>Нэвтрэлт нь demo бөгөөд бодит authentication биш. Бодит системд сервер талын баталгаажуулалт хэрэгтэй.</p>
    </section>
  );
}
