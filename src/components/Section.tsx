import type { ReactNode } from "react";

export function Section({
  id,
  title,
  intro,
  action,
  children,
  className = "",
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`container-x py-12 sm:py-16 ${className}`}>
      <header data-reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 id={headingId} className="text-2xl sm:text-3xl">
            {title}
          </h2>
          {intro && <p className="mt-2 text-muted">{intro}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
