
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Rows3,
  ImageOff,
} from "lucide-react";
import { stories } from "../data/stories";
import {
  getReadingProgress,
  saveReadingProgress,
} from "../lib/readingProgress";

type ReadingMode = "vertical" | "page";

const DEMO_PAGES = Array.from({ length: 5 }, () => "");

type ReaderPageProps = {
  image?: string;
  pageNumber: number;
  eager?: boolean;
};

function ReaderPage({
  image,
  pageNumber,
  eager = false,
}: ReaderPageProps) {
  const [hasError, setHasError] = useState(false);

  if (image && !hasError) {
    return (
      <img
        src={image}
        alt={`Página ${pageNumber} do capítulo`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setHasError(true)}
        className="block h-auto w-full rounded-lg bg-[#202020]"
      />
    );
  }

  return (
    <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-white/10 bg-[#202020]">
      <div className="px-4 text-center">
        {hasError ? (
          <ImageOff
            size={36}
            className="mx-auto text-gray-500"
          />
        ) : (
          <BookOpen
            size={36}
            className="mx-auto text-yellow-400"
          />
        )}

        <p className="mt-4 text-xl font-bold">
          Página {pageNumber}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {hasError
            ? "Não foi possível carregar a imagem."
            : "Ilustração demonstrativa"}
        </p>
      </div>
    </div>
  );
}

export function ChapterReader() {
  const { slug, chapterId } = useParams();
  const navigate = useNavigate();

  const story = stories.find((item) => item.slug === slug);

  const chapter = story?.chapters.find(
    (item) => item.id === Number(chapterId)
  );

  const pages = chapter?.pages?.length
    ? chapter.pages
    : DEMO_PAGES;

  const totalPages = pages.length;

  const chapterKey = `${slug}/${chapterId}`;

  const [initialProgress] = useState(() =>
    slug ? getReadingProgress(slug) : undefined
  );

  const [readingMode, setReadingMode] =
    useState<ReadingMode>(
      initialProgress?.readingMode === "page"
        ? "page"
        : "vertical"
    );

  const [currentPage, setCurrentPage] = useState(() => {
    if (
      initialProgress &&
      initialProgress.chapterId === Number(chapterId) &&
      Number.isInteger(initialProgress.currentPage)
    ) {
      return Math.max(
        0,
        Math.min(
          totalPages - 1,
          initialProgress.currentPage
        )
      );
    }

    return 0;
  });

  const [previousChapterKey, setPreviousChapterKey] =
    useState(chapterKey);

  const [scrollTarget, setScrollTarget] =
    useState<number | null>(currentPage);

  const readingAreaRef = useRef<HTMLDivElement>(null);

  if (previousChapterKey !== chapterKey) {
    setPreviousChapterKey(chapterKey);
    setCurrentPage(0);
    setScrollTarget(0);
  }

  // Restaurar a posição de leitura.
  useLayoutEffect(() => {
    if (scrollTarget === null) return;

    if (
      readingMode === "vertical" &&
      scrollTarget > 0
    ) {
      const target =
        readingAreaRef.current?.querySelector<HTMLElement>(
          `[data-page-index="${scrollTarget}"]`
        );

      target?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [chapterKey, readingMode, scrollTarget]);

  // Identificar a página visível no modo vertical.
  useEffect(() => {
    if (readingMode !== "vertical" || !chapter) {
      return;
    }

    const readingArea = readingAreaRef.current;

    if (!readingArea) return;

    const pageElements = Array.from(
      readingArea.querySelectorAll<HTMLElement>(
        "[data-page-index]"
      )
    );

    let frame = 0;

    function updateVisiblePage() {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight;

        let bestPage = -1;
        let largestVisibleArea = 0;

        for (const element of pageElements) {
          const rect = element.getBoundingClientRect();

          const visibleHeight = Math.max(
            0,
            Math.min(rect.bottom, viewportHeight) -
              Math.max(rect.top, 0)
          );

          if (visibleHeight > largestVisibleArea) {
            largestVisibleArea = visibleHeight;
            bestPage = Number(element.dataset.pageIndex);
          }
        }

        if (bestPage >= 0) {
          setCurrentPage(bestPage);
        }
      });
    }

    const observer = new IntersectionObserver(
      updateVisiblePage,
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    pageElements.forEach((element) =>
      observer.observe(element)
    );

    window.addEventListener(
      "scroll",
      updateVisiblePage,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateVisiblePage
    );

    updateVisiblePage();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        updateVisiblePage
      );

      window.removeEventListener(
        "resize",
        updateVisiblePage
      );
    };
  }, [chapterKey, readingMode, chapter]);

  // Salvar automaticamente o progresso.
  useEffect(() => {
    if (!story || !chapter) return;

    try {
      saveReadingProgress({
        storySlug: story.slug,
        chapterId: chapter.id,
        currentPage,
        totalPages,
        readingMode,
      });
    } catch (error) {
      console.warn(
        "Não foi possível salvar o progresso.",
        error
      );
    }
  }, [
    story,
    chapter,
    currentPage,
    totalPages,
    readingMode,
  ]);

  // Navegação pelo teclado.
  useEffect(() => {
    if (readingMode !== "page" || !chapter) return;

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest("input, textarea, select"))
      ) {
        return;
      }

      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setCurrentPage((page) =>
          Math.max(0, page - 1)
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setCurrentPage((page) =>
          Math.min(totalPages - 1, page + 1)
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [readingMode, totalPages, chapter]);

  const chapterIndex =
    story?.chapters.findIndex(
      (item) => item.id === Number(chapterId)
    ) ?? -1;

  const previousChapter =
    chapterIndex > 0
      ? story?.chapters[chapterIndex - 1]
      : undefined;

  const nextChapter =
    story && chapterIndex >= 0
      ? story.chapters[chapterIndex + 1]
      : undefined;

  if (!story || !chapter) {
    return (
      <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-bold">
          Capítulo não encontrado
        </h1>

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
    if (mode === readingMode) return;

    setScrollTarget(currentPage);
    setReadingMode(mode);
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
          <p className="text-sm font-semibold text-yellow-400">
            {story.title}
          </p>

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
            Capítulo {chapter.id}: {chapter.title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {totalPages}{" "}
            {totalPages === 1 ? "página" : "páginas"}
          </p>
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

        {/* Indicador de progresso */}
        <div className="mx-auto mt-6 max-w-sm">
          <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
            <span>
              Página {currentPage + 1} de {totalPages}
            </span>

            <span className="font-semibold text-yellow-400">
              {Math.round(
                ((currentPage + 1) / totalPages) * 100
              )}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Progresso no capítulo"
            aria-valuemin={0}
            aria-valuemax={totalPages}
            aria-valuenow={currentPage + 1}
            className="h-1.5 overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-300"
              style={{
                width: `${
                  ((currentPage + 1) / totalPages) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Área de leitura */}
        <div
          ref={readingAreaRef}
          className="mx-auto mt-8 max-w-3xl"
        >
          {readingMode === "vertical" ? (
            <div className="space-y-3">
              {pages.map((image, index) => (
                <div
                  key={`${chapterKey}-${index}-${image}`}
                  data-page-index={index}
                  className="min-h-[100px] scroll-mt-4"
                >
                  <ReaderPage
                    image={image}
                    pageNumber={index + 1}
                    eager={
                      index === 0 ||
                      index <= (scrollTarget ?? 0)
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <ReaderPage
                key={`${chapterKey}-${currentPage}-${pages[currentPage]}`}
                image={pages[currentPage]}
                pageNumber={currentPage + 1}
                eager
              />

              {/* Navegação entre páginas */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  aria-label="Página anterior"
                  disabled={currentPage === 0}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(0, page - 1)
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={18} />

                  <span className="hidden sm:inline">
                    Anterior
                  </span>
                </button>

                <span
                  aria-live="polite"
                  className="text-sm text-gray-400"
                >
                  {currentPage + 1} / {totalPages}
                </span>

                <button
                  type="button"
                  aria-label="Próxima página"
                  disabled={currentPage === totalPages - 1}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages - 1, page + 1)
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">
                    Próxima
                  </span>

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
            <span className="text-sm text-gray-500">
              Primeiro capítulo
            </span>
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
            <span className="text-sm text-gray-500">
              Último capítulo
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
