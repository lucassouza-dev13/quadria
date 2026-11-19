
import {
  Bell,
  Bookmark,
  Plus,
  Search,
  UserCircle,
} from 'lucide-react'

export function Header() {
  return (
    <header className="relative z-50 border-b border-white/10 bg-[#141414]">
      <div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between gap-6 px-6">

        {/* Logo */}
        <a
          href="/"
          className="shrink-0 text-3xl font-black tracking-tight text-white"
        >
          quadria<span className="text-yellow-400">.</span>
        </a>

        {/* Navegação */}
        <nav className="hidden h-[80px] items-center gap-8 text-sm font-medium text-gray-300 md:flex">
          <a
            href="/"
            aria-current="page"
            className="relative flex h-full items-center text-white after:absolute after:bottom-4 after:left-0 after:h-[2px] after:w-full after:bg-yellow-400"
          >
            Início
          </a>

          <a
            href="#explorar"
            className="transition hover:text-yellow-400"
          >
            Explorar
          </a>

          <a
            href="#categorias"
            className="transition hover:text-yellow-400"
          >
            Categorias
          </a>
        </nav>

        {/* Pesquisa */}
        <div className="relative ml-auto hidden w-full max-w-[240px] lg:block">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Buscar histórias..."
            aria-label="Buscar histórias"
            className="w-full rounded-xl border border-white/10 bg-[#242424] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-yellow-400"
          />
        </div>

        {/* Ações */}
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline">
              Publicar história
            </span>
          </button>

          <button
            type="button"
            aria-label="Minha biblioteca"
            title="Minha biblioteca"
            className="text-gray-300 transition hover:text-yellow-400"
          >
            <Bookmark size={21} />
          </button>

          <button
            type="button"
            aria-label="Notificações"
            title="Notificações"
            className="relative text-gray-300 transition hover:text-yellow-400"
          >
            <Bell size={21} />
          </button>

          <button
            type="button"
            aria-label="Meu perfil"
            title="Meu perfil"
            className="text-gray-300 transition hover:text-yellow-400"
          >
            <UserCircle size={23} />
          </button>
        </div>
      </div>
    </header>
  )
}
