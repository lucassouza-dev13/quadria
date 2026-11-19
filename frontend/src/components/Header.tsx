
export function Header() {
  return (
    <header className="border-b border-white/10 bg-[#141414]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">
        {/* Logo */}
        <a href="/" className="text-3xl font-black tracking-tight">
          quadria<span className="text-yellow-400">.</span>
        </a>

        {/* Navegação */}
        <nav className="flex items-center gap-6 text-sm text-gray-300">
          <a href="/" className="hover:text-yellow-400">
            Início
          </a>
          <a href="#explorar" className="hover:text-yellow-400">
            Explorar
          </a>
          <a href="#categorias" className="hover:text-yellow-400">
            Categorias
          </a>
        </nav>

        {/* Pesquisa */}
        <input
          type="search"
          placeholder="Buscar histórias..."
          aria-label="Buscar histórias"
          className="rounded-lg border border-white/10 bg-[#242424] px-4 py-3 text-sm outline-none focus:border-yellow-400"
        />

        {/* Publicação */}
        <button
          type="button"
          className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
        >
          Publicar história
        </button>
      </div>
    </header>
  )
}
