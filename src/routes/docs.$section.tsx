import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getSection, groupLabel, isEndpoint } from "@/lib/docs";

export const Route = createFileRoute("/docs/$section")({
  loader: ({ params }) => {
    const section = getSection(params.section);
    if (!section) throw notFound();
    return { title: section.title, count: section.features.length };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — Musicosy Docs` : "Unavailable";
    const description = loaderData
      ? `${loaderData.count} documented features on the ${loaderData.title} surface, with routes, components, services and permission rules.`
      : "This surface is unavailable.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: SectionPage,
});

function SectionPage() {
  const { section: sectionSlug } = Route.useParams();
  const section = getSection(sectionSlug)!;
  const { group, name } = groupLabel(section.title);

  return (
    <div className="max-w-3xl">
      <p className="label-mono">{group}</p>
      <h1 className="mt-2 text-3xl font-semibold">{name}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {section.features.length} documented features on this surface.
      </p>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {section.features.map((f, i) => (
          <Link
            key={f.slug}
            to="/docs/$section/$feature"
            params={{ section: section.slug, feature: f.slug }}
            className="group flex gap-4 py-4 transition-colors hover:bg-surface"
          >
            <span className="font-mono text-xs text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-medium">{f.name}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{f.goal}</p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                {f.routes || "—"} · {f.apis.filter(isEndpoint).length} endpoints
              </p>
            </div>
            <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
