
import { ArrowRight } from 'lucide-react'
import { StoryCard } from './StoryCard'
import { stories } from '../data/stories'

export function LatestReleases() {
  return (
    <section
      id="explorar"
      className="bg-[#101010] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-yellow-400" />

            <h2 className="text-2xl font-bold text-white">
              Lançamentos
            </h2>
          </div>

          <a
            href="#explorar"
            className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 transition hover:text-yellow-300"
          >
            Ver todos
            <ArrowRight size={17} />
          </a>
        </div>

        {/* Cards das histórias */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              title={story.title}
              author={story.author}
              genre={story.genre}
              image={story.image}
              slug={story.slug}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
