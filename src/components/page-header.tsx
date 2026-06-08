export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="im-section-title text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-muted text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
