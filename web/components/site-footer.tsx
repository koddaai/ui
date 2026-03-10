import Link from "next/link"
import { Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-black text-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 md:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="font-bold text-lg">
              kodda UI
            </Link>
            <p className="text-sm text-gray-400">
              Arquitetura operacional para empresas que querem liderar com IA
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/koddaai/ui"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="mailto:contato@kodda.ai"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              contato@kodda.ai
            </a>
          </div>
          <div className="text-center text-xs text-gray-400 md:text-right">
            <p>&copy; 2025/2026 kodda.ai</p>
            <p>
              CNPJ: 63.644.444/0001-80 - Alameda Rio Negro, 503 - Alphaville, Barueri - SP
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
