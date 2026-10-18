type Props = { page: number; totalPages: number; onChange: (page: number) => void };

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Хуудаслалт">
      <button onClick={() => onChange(page - 1)} disabled={page <= 1}>Өмнөх</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onChange(p)} aria-current={p === page ? "page" : undefined} className={p === page ? "on" : ""}>
          {p}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page >= totalPages}>Дараах</button>
    </nav>
  );
}
