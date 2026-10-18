import Link from "next/link";
import { site } from "@/site.config";
import { Icon } from "./Icon";

export type Crumb = { label: string; href: string };

// Breadcrumb trail with matching BreadcrumbList structured data.
// The last item is the current page.
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: new URL(item.href, site.url).toString(),
    })),
  };
  return (
    <nav aria-label={label} className="container-x pt-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="font-bold text-fg">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="inline-flex min-h-11 items-center hover:underline">
                    {item.label}
                  </Link>
                  <Icon name="chevron-forward" size={14} />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
