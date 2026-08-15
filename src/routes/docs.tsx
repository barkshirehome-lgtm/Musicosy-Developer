import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { SearchDialog } from "@/components/docs/SearchDialog";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center border border-foreground font-mono text-[11px] font-bold">
              M
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">
              Musicosy <span className="text-muted-foreground">Developer Docs</span>
            </span>
          </Link>
          <div className="ml-auto hidden sm:block">
            <SearchDialog />
          </div>
          <button
            className="ml-auto rounded-sm border border-border p-1.5 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] px-4 sm:px-6">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border py-8 pr-6 lg:block">
          <DocsSidebar />
        </aside>

        {mobileOpen && (
          <div className="fixed inset-x-0 top-14 bottom-0 z-30 overflow-y-auto border-t border-border bg-background p-4 lg:hidden">
            <div className="mb-4">
              <SearchDialog />
            </div>
            <DocsSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        )}

        <main className="min-w-0 flex-1 py-10 lg:pl-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
