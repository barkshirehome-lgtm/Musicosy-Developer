import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { sections, totalFeatures, totalEndpoints, groupLabel } from "@/lib/docs";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Musicosy Docs — Feature & API Reference" },
      {
        name: "description",
        content:
          "Complete Musicosy platform reference: 296 features across 15 surfaces with routes, components, endpoints and permission rules.",
      },
      { property: "og:title", content: "Musicosy Docs — Feature & API Reference" },
      {
        property: "og:description",
        content: "296 features, routes, components, endpoints and permission rules.",
      },
    ],
  }),
  component: DocsOverview,
});

function DocsOverview() {
  return (
    <div className="max-w-3xl">
      <p className="label-mono">Reference</p>
      <h1 className="mt-2 text-4xl font-semibold">Platform documentation</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Every Musicosy surface, feature, route, component, service and permission rule —
        organized by foundation surface. Use search (⌘K) to jump straight to a feature or
        endpoint.
      </p>

      <dl className="mt-8 grid grid-cols-3 border border-border">
        {[
          ["Surfaces", sections.length],
          ["Features", totalFeatures],
          ["Endpoints", totalEndpoints],
        ].map(([label, value]) => (
          <div key={label as string} className="border-r border-border p-4 last:border-r-0">
            <dt className="label-mono">{label}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 text-lg font-semibold">Surfaces</h2>
      <div className="mt-4 divide-y divide-border border-y border-border">
        {sections.map((section) => {
          const { group, name } = groupLabel(section.title);
          return (
            <Link
              key={section.slug}
              to="/docs/$section"
              params={{ section: section.slug }}
              className="group flex items-center gap-4 py-4 transition-colors hover:bg-surface"
            >
              <div className="min-w-0 flex-1">
                <p className="label-mono">{group}</p>
                <p className="mt-0.5 font-display text-base font-medium">{name}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {section.features.length} features
              </span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
