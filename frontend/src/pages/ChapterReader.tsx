import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Rows3,
} from "lucide-react";
import { stories } from "../data/stories";

type ReadingMode = "vertical" | "page";

const DEMO_PAGES = [1, 2, 3, 4, 5];

export function ChapterReader() {
  const { slug, chapterId } = useParams();
  const navigate = useNavigate();

  const [readingMode, setReadingMode] = useState<ReadingMode>("vertical");

  const [currentPage, setCurrentPage] = useState(0);

  const chapterKey = `${slug}/${chapterId}`;

  const [previousChapterKey, setPreviousChapterKey] = useState(chapterKey);

  if (previousChapterKey !== chapterKey) {
    setPreviousChapterKey(chapterKey);
    setCurrentPage(0);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [slug, chapterId]);

  useEffect(() => {
    if (readingMode !== "page") return;

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest("input, textarea, select"))
      ) {
        return;
      }

      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setCurrentPage((page) => Math.max(0, page - 1));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setCurrentPage((page) => Math.min(DEMO_PAGES.length - 1, page + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [readingMode]);

  const story = stories.find((item) => item.slug === slug);

  const chapter = story?.chapters.find((item) => item.id === Number(chapterId));

  const chapterIndex =
    story?.chapters.findIndex((item) => item.id === Number(chapterId)) ?? -1;

  const previousChapter =
    chapterIndex > 0 ? story?.chapters[chapterIndex - 1] : undefined;

  const nextChapter =
    story && chapterIndex >= 0 ? story.chapters[chapterIndex + 1] : undefined;

  if (!story || !chapter) {
    return (
      <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-bold">Capítulo não encontrado</h1>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-yellow-400"
        >
          <ArrowLeft size={18} />
          Voltar ao início
        </Link>
      </section>
    );
  }

  function changeMode(mode: ReadingMode) {
    setReadingMode(mode);
    setCurrentPage(0);
  }

  return (
    <section className="min-h-screen bg-[#101010]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Voltar à história */}
        <Link
          to={`/historias/${story.slug}`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-yellow-400"
        >
          <ArrowLeft size={18} />
          Voltar à história
        </Link>

        {/* Cabeçalho */}
        <div className="mt-8 text-center">
          <p className="text-sm font-semibold text-yellow-400">{story.title}</p>

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
            Capítulo {chapter.id}: {chapter.title}
          </h1>
        </div>



    {/* Seletor de capítulos */}
    <div className="mx-auto mt-6 max-w-sm">
    <select
        aria-label="Selecionar capítulo"
        value={chapter.id}
        onChange={(event) =>
        navigate(
            `/historias/${story.slug}/capitulos/${event.target.value}`
        )
        }
        className="w-full cursor-pointer rounded-xl border border-white/15 bg-[#202020] px-4 py-3 text-sm font-medium text-white outline-none transition hover:border-yellow-400/50 focus:border-yellow-400"
    >
        {story.chapters.map((item) => (
        <option key={item.id} value={item.id}>
            Capítulo {item.id} — {item.title}
        </option>
        ))}
    </select>
    </div>

        {/* Seletor de leitura */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => changeMode("vertical")}
            aria-pressed={readingMode === "vertical"}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              readingMode === "vertical"
                ? "bg-yellow-400 text-black"
                : "border border-white/15 bg-[#222] text-gray-300 hover:bg-[#333]"
            }`}
          >
            <Rows3 size={18} />
            Vertical
          </button>

          <button
            type="button"
            onClick={() => changeMode("page")}
            aria-pressed={readingMode === "page"}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              readingMode === "page"
                ? "bg-yellow-400 text-black"
                : "border border-white/15 bg-[#222] text-gray-300 hover:bg-[#333]"
            }`}
          >
            <Columns2 size={18} />
            Página
          </button>
        </div>

        {/* Área de leitura */}
        <div className="mx-auto mt-8 max-w-3xl">
          {readingMode === "vertical" ? (
            <div className="space-y-3">
              {DEMO_PAGES.map((page) => (
                <div
                  key={page}
                  className="flex aspect-[3/4] items-center justify-center rounded-lg border border-white/10 bg-[#202020]"
                >
                  <div className="text-center">
                    <BookOpen size={36} className="mx-auto text-yellow-400" />

                    <p className="mt-4 text-xl font-bold">Página {page}</p>

                    <p className="mt-2 text-sm text-gray-500">
                      Ilustração demonstrativa
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-white/10 bg-[#202020]">
                <div className="text-center">
                  <BookOpen size={36} className="mx-auto text-yellow-400" />

                  <p className="mt-4 text-xl font-bold">
                    Página {DEMO_PAGES[currentPage]}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Ilustração demonstrativa
                  </p>
                </div>
              </div>

              {/* Navegação entre páginas */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  aria-label="Página anterior"
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((page) => page - 1)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <span className="text-sm text-gray-400">
                  {currentPage + 1} / {DEMO_PAGES.length}
                </span>

                <button
                  type="button"
                  aria-label="Próxima página"
                  disabled={currentPage === DEMO_PAGES.length - 1}
                  onClick={() => setCurrentPage((page) => page + 1)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">Próxima</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navegação entre capítulos */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          {previousChapter ? (
            <Link
              to={`/historias/${story.slug}/capitulos/${previousChapter.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <ChevronLeft size={19} />
              Capítulo anterior
            </Link>
          ) : (
            <span className="text-sm text-gray-500">Primeiro capítulo</span>
          )}

          {nextChapter ? (
            <Link
              to={`/historias/${story.slug}/capitulos/${nextChapter.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
            >
              Próximo capítulo
              <ChevronRight size={19} />
            </Link>
          ) : (
            <span className="text-sm text-gray-500">Último capítulo</span>
          )}
        </div>
      </div>
    </section>
  );
}
