
import { BookOpen } from 'lucide-react'

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
    <article className="group min-w-0 cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#242424]">
        <img
          src={image}
          alt={`Capa de ${title}`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
          <BookOpen size={13} />
          {genre}
        </span>
      </div>

      <h3 className="mt-3 truncate text-base font-bold text-white transition group-hover:text-yellow-400">
        {title}
      </h3>

      <p className="mt-1 truncate text-sm text-gray-400">
        {author}
      </p>
    </article>
  )
}
