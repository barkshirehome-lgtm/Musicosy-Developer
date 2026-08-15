import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Code2, KeyRound } from "lucide-react";
import { sections, totalFeatures, totalEndpoints, groupLabel } from "@/lib/docs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Musicosy Developer Portal — Feature & API Docs" },
      {
        name: "description",
        content:
          "The developer portal for Musicosy: 296 documented features across 15 surfaces, with routes, components, API endpoints and permission rules.",
      },
      { property: "og:title", content: "Musicosy Developer Portal" },
      {
        property: "og:description",
        content: "296 documented features, routes, components, endpoints and permission rules.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center border border-foreground font-mono text-[11px] font-bold">
              M
            </span>
            <span className="font-display text-sm font-semibold">Musicosy</span>
          </div>
          <Link
            to="/docs"
            className="border border-foreground px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            Enter docs
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-paper opacity-30" />
        <div className="relative mx-auto max-w-[1100px] px-6 py-24">
          <p className="label-mono">Developer Portal · v1</p>
          <h1 className="mt-4 max-w-2xl text-5xl leading-[1.05] font-semibold sm:text-6xl">
            The complete Musicosy platform reference.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Every surface, feature, route, component, service and permission rule — documented
            in one searchable place for the teams building Musicosy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Browse documentation <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/docs/$section"
              params={{ section: sections[0].slug }}
              className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
            >
              Start with Discover
            </Link>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 border border-border bg-background">
            {[
              [Boxes, "Surfaces", sections.length],
              [Code2, "Features", totalFeatures],
              [KeyRound, "Endpoints", totalEndpoints],
            ].map(([Icon, label, value]) => {
              const I = Icon as typeof Boxes;
              return (
                <div key={label as string} className="border-r border-border p-5 last:border-r-0">
                  <I className="size-4 text-muted-foreground" />
                  <dt className="label-mono mt-3">{label as string}</dt>
                  <dd className="mt-1 font-display text-3xl font-semibold">{value as number}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <h2 className="text-lg font-semibold">Documentation surfaces</h2>
        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const { group, name } = groupLabel(section.title);
            return (
              <Link
                key={section.slug}
                to="/docs/$section"
                params={{ section: section.slug }}
                className="group bg-background p-5 transition-colors hover:bg-surface"
              >
                <p className="label-mono">{group}</p>
                <p className="mt-1 font-display text-base font-medium">{name}</p>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                  {section.features.length} features
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1100px] px-6 py-8 font-mono text-[11px] text-muted-foreground">
          Musicosy Developer Portal — internal feature inventory reference.
        </div>
      </footer>
    </div>
  );
}
