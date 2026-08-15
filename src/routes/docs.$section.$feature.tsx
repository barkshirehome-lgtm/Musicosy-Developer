import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { getFeature, getSection, groupLabel, isEndpoint, parseEndpoint } from "@/lib/docs";

export const Route = createFileRoute("/docs/$section/$feature")({
  loader: ({ params }) => {
    const { section, feature } = getFeature(params.section, params.feature);
    if (!section || !feature) throw notFound();
    return { name: feature.name, goal: feature.goal, section: section.title };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} — Musicosy Docs` : "Unavailable";
    const description = loaderData?.goal ?? "This page is unavailable.";
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 155) },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: FeaturePage,
});

const TOC = [
  ["overview", "Overview"],
  ["actions", "Actions"],
  ["interface", "Interface"],
  ["api", "API reference"],
  ["rules", "Rules & permissions"],
] as const;

function FeaturePage() {
  const params = Route.useParams();
  const section = getSection(params.section)!;
  const feature = section.features.find((f) => f.slug === params.feature)!;
  const { group, name } = groupLabel(section.title);
  const index = section.features.indexOf(feature);
  const prev = section.features[index - 1];
  const next = section.features[index + 1];

  return (
    <div className="flex gap-10">
      <article className="min-w-0 max-w-3xl flex-1">
        <nav className="flex flex-wrap items-center gap-1 font-mono text-[11px] text-muted-foreground">
          <Link to="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <ChevronRight className="size-3" />
          <Link
            to="/docs/$section"
            params={{ section: section.slug }}
            className="hover:text-foreground"
          >
            {name}
          </Link>
        </nav>

        <p className="label-mono mt-6">{group}</p>
        <h1 id="overview" className="mt-2 scroll-mt-24 text-3xl font-semibold">
          {feature.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{feature.goal}</p>

        {feature.routes && (
          <div className="mt-6 border border-border bg-code p-3 font-mono text-xs">
            <span className="text-muted-foreground">route</span> {feature.routes}
          </div>
        )}

        <Section id="actions" title="Actions">
          <ul className="space-y-2">
            {feature.actions.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="interface" title="Interface">
          <div className="flex flex-wrap gap-2">
            {feature.components
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
              .map((c) => (
                <code
                  key={c}
                  className="border border-border bg-code px-2 py-1 font-mono text-xs"
                >
                  {c}
                </code>
              ))}
          </div>
        </Section>

        <Section id="api" title="API reference">
          <div className="border border-border">
            <div className="grid grid-cols-[80px_1fr] border-b border-border bg-surface px-3 py-2 label-mono">
              <span>Method</span>
              <span>Endpoint / service</span>
            </div>
            {feature.apis.map((api, i) => {
              const { method, path } = parseEndpoint(api);
              const endpoint = isEndpoint(api);
              return (
                <div
                  key={i}
                  className="grid grid-cols-[80px_1fr] items-center gap-2 border-b border-border px-3 py-2 last:border-b-0 font-mono text-xs"
                >
                  <span
                    className={
                      endpoint
                        ? "w-fit border border-foreground px-1.5 py-0.5 text-[10px] font-semibold"
                        : "text-[10px] text-muted-foreground"
                    }
                  >
                    {endpoint ? method.toUpperCase() : "SERVICE"}
                  </span>
                  <span className="break-all">{endpoint ? path : api}</span>
                </div>
              );
            })}
          </div>
        </Section>

        <Section id="rules" title="Rules & permissions">
          <ul className="space-y-2">
            {feature.rules.map((r, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-2 size-1 shrink-0 bg-foreground" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-16 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/docs/$section/$feature"
              params={{ section: section.slug, feature: prev.slug }}
              className="border border-border p-3 transition-colors hover:bg-surface"
            >
              <p className="label-mono">Previous</p>
              <p className="mt-1 text-sm font-medium">{prev.name}</p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to="/docs/$section/$feature"
              params={{ section: section.slug, feature: next.slug }}
              className="border border-border p-3 text-right transition-colors hover:bg-surface"
            >
              <p className="label-mono">Next</p>
              <p className="mt-1 text-sm font-medium">{next.name}</p>
            </Link>
          )}
        </div>
      </article>

      <aside className="sticky top-20 hidden h-fit w-48 shrink-0 xl:block">
        <p className="label-mono mb-2">On this page</p>
        <ul className="space-y-1.5 border-l border-border">
          {TOC.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="-ml-px block border-l border-transparent pl-3 text-[13px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-24">
      <h2 className="mb-4 border-b border-border pb-2 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}
