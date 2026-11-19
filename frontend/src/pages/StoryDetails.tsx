
import { Link, useParams } from 'react-router'
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  ChevronRight,
  UserRound,
  List,
} from 'lucide-react'
import { stories } from '../data/stories'

export function StoryDetails() {
  const { slug } = useParams()

  const story = stories.find((item) => item.slug === slug)

  if (!story) {
    return (
      <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">
          História não encontrada
        </h1>

        <p className="mt-4 text-gray-400">
          A história que você procura não está disponível.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
        >
          <ArrowLeft size={18} />
          Voltar ao início
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Navegação */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-yellow-400"
      >
        <ArrowLeft size={18} />
        Voltar ao início
      </Link>

      {/* Informações da história */}
      <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        {/* Capa */}
        <div className="mx-auto w-full max-w-[220px] sm:max-w-[260px] md:mx-0">
          <img
            src={story.image}
            alt={`Capa de ${story.title}`}
            className="aspect-[3/4] w-full rounded-xl object-cover shadow-2xl"
          />
        </div>

        {/* Conteúdo */}
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-400">
              {story.genre}
            </span>

            <span className="rounded-md border border-white/15 px-3 py-1 text-xs text-gray-300">
              {story.status}
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {story.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-gray-400">
            <UserRound size={18} />
            <span>por {story.author}</span>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
            <BookOpen size={18} />
            <span>
              {story.chapters.length} capítulos cadastrados
            </span>
          </div>

          {/* Sinopse */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Sinopse</h2>

            <p className="mt-3 max-w-2xl leading-7 text-gray-300">
              {story.synopsis}
            </p>
          </div>

          {/* Ações */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              title="Leitura disponível futuramente"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-yellow-400/60 px-6 py-3 font-bold text-black opacity-70"
            >
              <BookOpen size={19} />
              Começar a ler
            </button>

            <button
              type="button"
              disabled
              title="Biblioteca disponível futuramente"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-medium text-gray-400"
            >
              <Bookmark size={19} />
              Adicionar à biblioteca
            </button>
          </div>
        </div>
      </div>

      {/* Lista de capítulos */}
      <div className="mt-14 border-t border-white/10 pt-8">
        <div className="mb-6 flex items-center gap-3">
          <List size={22} className="text-yellow-400" />

          <h2 className="text-2xl font-bold">
            Capítulos
          </h2>

          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
            {story.chapters.length}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#191919]">
          
{story.chapters.map((chapter, index) => (
  <Link
    key={chapter.id}
    to={`/historias/${story.slug}/capitulos/${chapter.id}`}
    className="group flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 transition-colors duration-200 last:border-b-0 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-yellow-400"
  >
    <div className="min-w-0">
      <p className="text-sm text-gray-400">
        Capítulo {index + 1}
      </p>

      <h3 className="mt-1 font-semibold text-white transition-colors group-hover:text-yellow-400">
        {chapter.title}
      </h3>
    </div>

    <ChevronRight
      size={20}
      className="shrink-0 text-gray-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-yellow-400"
    />
    </Link>
    ))}

        </div>
      </div>
    </section>
  )
}
