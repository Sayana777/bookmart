export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  pdfPath: string;
  category: string;
  year: number;
};

// Жишээ дата. Багшийн өгсөн 20 номын датагаар солино.
const cover = (isbn: string) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
const row = (n: number, title: string, author: string, category: string, year: number, isbn: string, description: string): Book => ({
  id: `book-${String(n).padStart(2, "0")}`,
  title, author, description, category, year,
  coverUrl: cover(isbn),
  pdfPath: `/pdfs/book-${String(n).padStart(2, "0")}.pdf`,
});

export const books: Book[] = [
  row(1, "Clean Code", "Robert C. Martin", "Programming", 2008, "9780132350884", "Уншихад хялбар, засварлахад амар код бичих зарчмууд."),
  row(2, "The Pragmatic Programmer", "Andrew Hunt, David Thomas", "Programming", 2019, "9780135957059", "Программистын өдөр тутмын ажлын практик зөвлөгөөнүүд."),
  row(3, "Refactoring", "Martin Fowler", "Programming", 2018, "9780134757599", "Ажиллаж байгаа кодыг аюулгүй сайжруулах аргууд."),
  row(4, "Code Complete", "Steve McConnell", "Programming", 2004, "9780735619678", "Програм хангамж бүтээх гарын авлага."),
  row(5, "Design Patterns", "Erich Gamma нар", "Programming", 1994, "9780201633610", "Объект хандлагат загварчлалын сонгодог 23 загвар."),
  row(6, "Clean Architecture", "Robert C. Martin", "Programming", 2017, "9780134494166", "Системийн архитектурыг цэвэр байлгах зарчим."),
  row(7, "Introduction to Algorithms", "Thomas H. Cormen нар", "Programming", 2009, "9780262033848", "Алгоритм ба өгөгдлийн бүтцийн иж бүрэн сурах бичиг."),
  row(8, "Eloquent JavaScript", "Marijn Haverbeke", "Web Development", 2018, "9781593279509", "JavaScript хэлийг гүнзгий, ойлгомжтой тайлбарласан ном."),
  row(9, "JavaScript: The Good Parts", "Douglas Crockford", "Web Development", 2008, "9780596517748", "JavaScript-ийн хамгийн хэрэгтэй хэсгүүд."),
  row(10, "Learning React", "Alex Banks, Eve Porcello", "Web Development", 2020, "9781492051725", "React-ийн орчин үеийн хандлагаар танилцуулсан ном."),
  row(11, "Programming TypeScript", "Boris Cherny", "Web Development", 2019, "9781492037651", "TypeScript-ийн төрлийн системийг практикаар заана."),
  row(12, "Head First Design Patterns", "Eric Freeman нар", "Web Development", 2004, "9780596007126", "Загварыг зурагтай, хөнгөн хэлбэрээр тайлбарласан."),
  row(13, "Python Crash Course", "Eric Matthes", "Data & AI", 2019, "9781593279288", "Python-г төсөл хийж суралцах эхлэгчийн ном."),
  row(14, "Automate the Boring Stuff with Python", "Al Sweigart", "Data & AI", 2019, "9781593275990", "Python-оор өдөр тутмын ажлыг автоматжуулах."),
  row(15, "Fluent Python", "Luciano Ramalho", "Data & AI", 2015, "9781491946008", "Python-ийг мэргэжлийн түвшинд эзэмшихэд."),
  row(16, "Designing Data-Intensive Applications", "Martin Kleppmann", "Data & AI", 2017, "9781449373320", "Өгөгдөлд суурилсан системийн дизайны суурь ойлголтууд."),
  row(17, "Hands-On Machine Learning", "Aurélien Géron", "Data & AI", 2019, "9781492032649", "Scikit-Learn, TensorFlow-оор машин сургалт."),
  row(18, "Deep Learning", "Ian Goodfellow нар", "Data & AI", 2016, "9780262035613", "Гүн сургалтын онол, математикийн үндэс."),
  row(19, "iOS Programming: The Big Nerd Ranch Guide", "Christian Keur, Aaron Hillegass", "Mobile Development", 2016, "9780134682334", "iOS апп бүтээх алхам алхмын гарын авлага."),
  row(20, "Structure and Interpretation of Computer Programs", "Harold Abelson нар", "Programming", 1996, "9780262510875", "Програмчлалын үндсэн санааг заадаг сонгодог сурах бичиг."),
];

export const categories = ["Programming", "Web Development", "Data & AI", "Mobile Development"];
export const getBook = (id: string) => books.find((b) => b.id === id);
