
import { BookOpen, ArrowUpRight } from 'lucide-react'

type StoryCardProps = {
  title: string
  author: string
  genre: string
  image: string
}

export function StoryCard({
  title,
  author,
  genre,
  image,
}: StoryCardProps) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#242424] ring-1 ring-white/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-yellow-400/40">
        {/* Capa */}
        <img
          src={image}
          alt={`Capa de ${title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Degradê inferior */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        {/* Gênero */}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/75 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <BookOpen size={13} />
          {genre}
        </span>

        {/* Indicador visual */}
        <div className="absolute right-3 top-3 flex h-9 w-9 translate-y-[-8px] items-center justify-center rounded-full bg-yellow-400 text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
  )
}
