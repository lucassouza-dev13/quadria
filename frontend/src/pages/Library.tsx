
import { useState } from "react";
import { Link } from "react-router";
import {
  Bookmark,
  LibraryBig,
  Compass,
  Trash2,
  ArrowLeft,
  History,
  BookOpen,
  X,
} from "lucide-react";
import { stories } from "../data/stories";
import { getLibrary, removeFromLibrary } from "../lib/library";
import {
  getAllProgress,
  removeReadingProgress,
} from "../lib/readingProgress";
import type { ReadingProgress } from "../lib/readingProgress";

export function Library() {
  const [library, setLibrary] = useState<string[]>(getLibrary);

  const [readingProgress, setReadingProgress] =
    useState<ReadingProgress[]>(getAllProgress);

  const savedStories = stories.filter((story) =>
    library.includes(story.slug)
  );

  const continueReading = readingProgress
    .flatMap((progress) => {
      const story = stories.find(
        (item) => item.slug === progress.storySlug
      );

      const chapter = story?.chapters.find(
        (item) => item.id === progress.chapterId
      );

      if (!story || !chapter) return [];

      const totalPages = chapter.pages?.length || 5;

      const currentPage = Math.max(
        0,
        Math.min(
          totalPages - 1,
          Number.isInteger(progress.currentPage)
            ? progress.currentPage
            : 0
        )
      );

      const percentage = Math.round(
        ((currentPage + 1) / totalPages) * 100
      );

      return [
        {
          progress,
          story,
          chapter,
          currentPage,
          totalPages,
          percentage,
        },
      ];
    })
    .sort(
      (a, b) =>
        new Date(b.progress.updatedAt).getTime() -
        new Date(a.progress.updatedAt).getTime()
    );

  function handleRemove(slug: string) {
    removeFromLibrary(slug);
    setLibrary(getLibrary());
  }

  function handleRemoveProgress(slug: string) {
    removeReadingProgress(slug);
    setReadingProgress(getAllProgress());
  }

  return (
    <section className="mx-auto min-h-[80vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Navegação */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-yellow-400"
      >
        <ArrowLeft size={18} />
        Voltar ao início
      </Link>

      {/* Cabeçalho */}
      <div className="flex items-center gap-4">
        <LibraryBig size={32} className="text-yellow-400" />

        <h1 className="text-3xl font-black sm:text-4xl">
          Minha biblioteca
        </h1>
      </div>

      <p className="mt-3 text-gray-400">
        Reúna suas histórias favoritas e continue de onde parou.
      </p>

      {/* Continuar lendo */}
      <div className="mt-10">
        <div className="mb-6 flex items-center gap-3">
          <History size={22} className="text-yellow-400" />

          <h2 className="text-xl font-bold">
            Continuar lendo
          </h2>

          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
            {continueReading.length}
          </span>
        </div>

        {continueReading.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 bg-[#191919] px-6 py-10 text-center">
            <BookOpen
              size={36}
              className="mx-auto text-gray-600"
            />

            <h3 className="mt-4 font-bold">
              Nenhuma leitura iniciada
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Comece a ler uma história e acompanhe
              seu progresso por aqui.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {continueReading.map(
              ({
                story,
                chapter,
                currentPage,
                totalPages,
                percentage,
              }) => (
                <article
                  key={story.slug}
                  className="relative flex gap-4 rounded-xl border border-white/10 bg-[#191919] p-4 transition hover:border-white/20 sm:gap-5"
                >
                  {/* Remover do histórico */}
                  <button
                    type="button"
                    title="Remover do histórico"
                    aria-label={`Remover ${story.title} do histórico`}
                    onClick={() =>
                      handleRemoveProgress(story.slug)
                    }
                    className="absolute right-3 top-3 cursor-pointer rounded-md p-1 text-gray-500 transition hover:bg-red-400/10 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>

                  {/* Capa */}
                  <Link
                    to={`/historias/${story.slug}`}
                    className="w-[90px] shrink-0 self-start overflow-hidden rounded-lg sm:w-[120px]"
                  >
                    <img
                      src={story.image}
                      alt={`Capa de ${story.title}`}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </Link>

                  {/* Informações */}
                  <div className="min-w-0 flex-1">
                    <span className="block pr-6 text-xs font-semibold text-yellow-400">
                      {story.genre}
                    </span>

                    <Link
                      to={`/historias/${story.slug}`}
                      className="mt-1 block pr-6 text-base font-bold transition hover:text-yellow-400 sm:text-lg"
                    >
                      {story.title}
                    </Link>

                    <p className="mt-1 text-xs leading-5 text-gray-400 sm:text-sm">
                      Capítulo {chapter.id} — {chapter.title}
                    </p>

                    {/* Progresso */}
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between gap-2 text-xs">
                        <span className="text-gray-400">
                          Página {currentPage + 1} de {totalPages}
                        </span>

                        <span className="font-semibold text-yellow-400">
                          {percentage}%
                        </span>
                      </div>

                      <div
                        role="progressbar"
                        aria-label={`Progresso de ${story.title}`}
                        aria-valuemin={0}
                        aria-valuemax={totalPages}
                        aria-valuenow={currentPage + 1}
                        className="h-1.5 overflow-hidden rounded-full bg-white/10"
                      >
                        <div
                          className="h-full rounded-full bg-yellow-400 transition-all duration-300"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Continuar leitura */}
                    <Link
                      to={`/historias/${story.slug}/capitulos/${chapter.id}`}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-3 py-2.5 text-xs font-bold text-black transition hover:bg-yellow-300 sm:w-auto sm:px-4 sm:text-sm"
                    >
                      <BookOpen
                        size={16}
                        className="shrink-0"
                      />
                      Continuar leitura
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </div>

      {/* Histórias salvas */}
      <div className="mt-12 border-t border-white/10 pt-8">
        <div className="mb-6 flex items-center gap-3">
          <Bookmark size={22} className="text-yellow-400" />

          <h2 className="text-xl font-bold">
            Histórias salvas
          </h2>

          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
            {savedStories.length}
          </span>
        </div>

        {savedStories.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/15 bg-[#191919] px-6 py-16 text-center">
            <Bookmark
              size={48}
              className="text-gray-600"
            />

            <h3 className="mt-5 text-xl font-bold">
              Nenhuma história salva
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
              Descubra novas histórias e adicione suas
              favoritas à biblioteca para acessá-las
              quando quiser.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
            >
              <Compass size={19} />
              Explorar histórias
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {savedStories.map((story) => (
              <article
                key={story.slug}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#191919]"
              >
                <Link
                  to={`/historias/${story.slug}`}
                  className="group block overflow-hidden"
                >
                  <img
                    src={story.image}
                    alt={`Capa de ${story.title}`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="p-3 sm:p-4">
                  <span className="text-xs font-semibold text-yellow-400">
                    {story.genre}
                  </span>

                  <Link
                    to={`/historias/${story.slug}`}
                    className="mt-2 block font-bold transition hover:text-yellow-400"
                  >
                    {story.title}
                  </Link>

                  <p className="mt-1 text-xs text-gray-400">
                    {story.author}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleRemove(story.slug)}
                    aria-label={`Remover ${story.title} da biblioteca`}
                    className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-2 py-2.5 text-xs font-medium text-gray-400 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-400"
                  >
                    <Trash2 size={15} />
                    Remover
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
