import { Link, useParams } from "@tanstack/react-router";
import { sections, groupLabel } from "@/lib/docs";

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const params = useParams({ strict: false }) as {
    section?: string;
    feature?: string;
  };

  return (
    <nav className="space-y-6 pb-16 text-sm">
      <div>
        <p className="label-mono mb-2">Portal</p>
        <Link
          to="/docs"
          activeOptions={{ exact: true }}
          onClick={onNavigate}
          className="block rounded-sm px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          activeProps={{ className: "bg-accent text-foreground font-medium" }}
        >
          Overview
        </Link>
      </div>

      {sections.map((section) => {
        const { group, name } = groupLabel(section.title);
        const isOpen = params.section === section.slug;
        return (
          <div key={section.slug}>
            <p className="label-mono mb-1">{group}</p>
            <Link
              to="/docs/$section"
              params={{ section: section.slug }}
              onClick={onNavigate}
              className="block rounded-sm px-2 py-1 font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
            >
              {name}
              <span className="ml-1.5 font-mono text-[10px] text-muted-foreground">
                {section.features.length}
              </span>
            </Link>
            {isOpen && (
              <ul className="mt-1 ml-2 border-l border-border">
                {section.features.map((f) => (
                  <li key={f.slug}>
                    <Link
                      to="/docs/$section/$feature"
                      params={{ section: section.slug, feature: f.slug }}
                      onClick={onNavigate}
                      className="-ml-px block border-l border-transparent py-1 pl-3 text-[13px] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                      activeProps={{
                        className: "border-foreground text-foreground font-medium",
                      }}
                    >
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
