
import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from 'react-router'
import {
  Bell,
  Bookmark,
  Plus,
  Search,
  UserCircle,
  Compass,
} from 'lucide-react'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const [search, setSearch] = useState('')

  const isExplore = location.pathname === '/explorar'

  const isCategories =
    isExplore && location.hash === '#categorias'

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = search.trim()

    if (query) {
      const params = new URLSearchParams({ q: query })

      navigate(`/explorar?${params.toString()}`)
    } else {
      navigate('/explorar')
    }

    setSearch('')
  }

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#141414]">
      <div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-3xl font-black tracking-tight text-white"
        >
          quadria<span className="text-yellow-400">.</span>
        </Link>

        {/* Navegação */}
        <nav className="hidden h-[80px] items-center gap-8 text-sm font-medium text-gray-300 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative flex h-full items-center transition ${
                isActive
                  ? 'text-white after:absolute after:bottom-4 after:left-0 after:h-[2px] after:w-full after:bg-yellow-400'
                  : 'hover:text-yellow-400'
              }`
            }
          >
            Início
          </NavLink>

          {/* Explorar */}
          <Link
            to="/explorar"
            aria-current={
              isExplore && !isCategories
                ? 'page'
                : undefined
            }
            className={`relative flex h-full items-center transition ${
              isExplore && !isCategories
                ? 'text-white after:absolute after:bottom-4 after:left-0 after:h-[2px] after:w-full after:bg-yellow-400'
                : 'hover:text-yellow-400'
            }`}
          >
            Explorar
          </Link>

          {/* Categorias */}
          <Link
            to="/explorar#categorias"
            aria-current={
              isCategories ? 'location' : undefined
            }
            className={`relative flex h-full items-center transition ${
              isCategories
                ? 'text-white after:absolute after:bottom-4 after:left-0 after:h-[2px] after:w-full after:bg-yellow-400'
                : 'hover:text-yellow-400'
            }`}
          >
            Categorias
          </Link>
        </nav>

        {/* Pesquisa */}
        <form
          role="search"
          onSubmit={handleSearch}
          className="relative ml-auto hidden w-full max-w-[240px] lg:block"
        >
          <button
            type="submit"
            aria-label="Pesquisar histórias"
            title="Pesquisar histórias"
            className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition hover:text-yellow-400"
          >
            <Search size={18} />
          </button>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Buscar histórias..."
            aria-label="Buscar histórias"
            className="w-full rounded-xl border border-white/10 bg-[#242424] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-yellow-400"
          />
        </form>

        {/* Ações */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">

          {/* Explorar no mobile */}
          <NavLink
            to="/explorar"
            aria-label="Explorar histórias"
            title="Explorar histórias"
            className={({ isActive }) =>
              `transition md:hidden ${
                isActive
                  ? 'text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-400'
              }`
            }
          >
            <Compass size={22} />
          </NavLink>

          {/* Publicar */}
          <button
            type="button"
            aria-label="Publicar história"
            title="Publicar história"
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-3 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 sm:px-5"
          >
            <Plus size={18} strokeWidth={2.5} />

            <span className="hidden sm:inline">
              Publicar história
            </span>
          </button>

          {/* Biblioteca */}
          <NavLink
            to="/biblioteca"
            aria-label="Minha biblioteca"
            title="Minha biblioteca"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? 'text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-400'
              }`
            }
          >
            {({ isActive }) => (
              <Bookmark
                size={21}
                fill={isActive ? 'currentColor' : 'none'}
              />
            )}
          </NavLink>

          {/* Notificações */}
          <button
            type="button"
            aria-label="Notificações"
            title="Notificações"
            className="relative text-gray-300 transition hover:text-yellow-400"
          >
            <Bell size={21} />
          </button>

          {/* Perfil */}
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
