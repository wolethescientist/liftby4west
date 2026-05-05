export function PageHeader({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return (
    <header className="mb-6">
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-text">{title}</h1>
    </header>
  );
}
