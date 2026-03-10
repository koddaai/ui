import Link from "next/link"

const categories = [
  {
    title: "Data & Tables",
    count: 6,
    components: ["DataTable", "FilterBar", "StatusBadge"],
  },
  {
    title: "Forms & Inputs",
    count: 9,
    components: ["CurrencyInput", "AddressForm", "EntityCombobox"],
  },
  {
    title: "Layout & Navigation",
    count: 10,
    components: ["AppLayout", "PageHeader", "AppSidebar"],
  },
  {
    title: "Landing Pages",
    count: 6,
    components: ["LandingHero", "LandingFeatures", "LandingCta"],
  },
  {
    title: "Templates",
    count: 7,
    components: ["ListPage", "DetailPage", "FormPage", "PortalPage"],
  },
  {
    title: "Hooks",
    count: 4,
    components: ["useDataTable", "useFilters", "usePagination", "useDebounce"],
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-8 px-4 py-24 text-center md:px-8 md:py-32">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              kodda UI
            </h1>
            <p className="mx-auto max-w-[42rem] text-lg text-gray-400 sm:text-xl">
              Design System: crie interfaces mais rápido. Componentes de UI
              compostos e acessíveis construídos com shadcn/ui.
            </p>
            <p className="text-sm text-[#5B5BD6]">+33 Mock Components para demonstrações</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#5B5BD6] px-8 text-sm font-semibold text-white shadow transition-colors hover:bg-[#5B5BD6]/90"
            >
              Documentação
            </Link>
            <Link
              href="/docs/components"
              className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 px-8 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Componentes
            </Link>
          </div>
          <div className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 bg-white/5 px-4 font-mono text-sm text-gray-300">
            npx @koddaai/ui init
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        {/* Component Categories */}
        <section className="grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.title} className="rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{category.title}</h3>
                <span className="text-sm text-muted-foreground">{category.count}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {category.components.map((name) => (
                  <span
                    key={name}
                    className="rounded-md border bg-muted/50 px-2 py-1 font-mono text-xs"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Quick Start */}
        <section className="mx-auto max-w-2xl pb-24">
          <h2 className="mb-6 text-center text-2xl font-bold">Quick Start</h2>
          <div className="space-y-3 rounded-lg border bg-muted/50 p-6">
            <div className="font-mono text-sm">
              <span className="text-muted-foreground"># 1. Inicializar</span>
              <br />
              npx @koddaai/ui init
            </div>
            <div className="font-mono text-sm">
              <span className="text-muted-foreground"># 2. Adicionar componentes</span>
              <br />
              npx @koddaai/ui add data-table page-header
            </div>
            <div className="font-mono text-sm">
              <span className="text-muted-foreground"># 3. Componentes copiados para seu projeto</span>
              <br />
              {`import { DataTable } from "@/components/kodda/data-table"`}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Requisitos: React 18+, TypeScript, Tailwind CSS, shadcn/ui
          </p>
        </section>

        {/* Open Source */}
        <section className="border-t py-16 text-center">
          <h2 className="mb-4 text-2xl font-bold">Open Source</h2>
          <p className="text-muted-foreground">
            Licença MIT — Clone, copie, modifique.
          </p>
          <div className="mt-6">
            <Link
              href="https://github.com/koddaai/ui"
              className="inline-flex items-center gap-2 text-[#5B5BD6] hover:underline"
              target="_blank"
            >
              GitHub →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
