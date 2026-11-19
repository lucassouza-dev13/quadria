
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router'

type StoryCardProps = {
  title: string
  author: string
  genre: string
  image: string
  slug: string
}

export function StoryCard({
  title,
  author,
  genre,
  image,
  slug,
}: StoryCardProps) {
  return (
    <Link
      to={`/historias/${slug}`}
      className="group block min-w-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
      aria-label={`Ver detalhes de ${title}`}
    >
      <article>
        {/* Capa */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#242424] ring-1 ring-white/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-yellow-400/40">
          <img
            src={image}
            alt={`Capa de ${title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />

          {/* Gradiente inferior */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          {/* Gênero */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/75 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <BookOpen size={13} />
            {genre}
          </span>

          {/* Ícone de navegação */}
          <div className="absolute right-3 top-3 flex h-9 w-9 -translate-y-2 items-center justify-center rounded-full bg-yellow-400 text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Informações */}
        <div className="mt-3">
          <h3 className="truncate text-base font-bold text-white transition-colors duration-300 group-hover:text-yellow-400">
            {title}
          </h3>

          <p className="mt-1 truncate text-sm text-gray-400">
            {author}
          </p>
        </div>
      </article>
    </Link>
  )
}
