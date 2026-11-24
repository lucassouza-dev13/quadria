
import { useEffect } from "react";
import {
  Compass,
  Search,
  SlidersHorizontal,
  SearchX,
  X,
  ArrowLeft,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { stories } from "../data/stories";
import { StoryCard } from "../components/StoryCard";

type SortOption = "recent" | "title-asc" | "title-desc";

const genres = [
  "Todos",
  ...Array.from(
    new Set(stories.map((story) => story.genre))
  ).sort((a, b) => a.localeCompare(b, "pt-BR")),
];

const statuses = [
  "Todos",
  "Em andamento",
  "Concluída",
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function Explore() {
  const [searchParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();

  // Recuperar filtros da URL.
  const search = searchParams.get("q") ?? "";

  const genreParam =
    searchParams.get("genre") ?? "Todos";

  const statusParam =
    searchParams.get("status") ?? "Todos";

  const sortParam =
    searchParams.get("sort") ?? "recent";

  // Validar os parâmetros recebidos.
  const genre = genres.includes(genreParam)
    ? genreParam
    : "Todos";

  const status = statuses.includes(statusParam)
    ? statusParam
    : "Todos";

  const sort: SortOption =
    sortParam === "title-asc" ||
    sortParam === "title-desc"
      ? sortParam
      : "recent";

  // Atualizar um filtro sem perder os demais.
  function updateFilter(
    key: string,
    value: string,
    defaultValue = ""
  ) {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();

    navigate(
      {
        pathname: "/explorar",
        search: query ? `?${query}` : "",
        hash: location.hash,
      },
      {
        replace: key === "q",
      }
    );
  }

  // Navegação até as categorias.
  useEffect(() => {
    if (location.hash === "#categorias") {
      const frame = requestAnimationFrame(() => {
        document
          .getElementById("categorias")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });

      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.hash]);

  const normalizedSearch = normalizeText(search);

  const filteredStories = stories
    .filter((story) => {
      const matchesSearch =
        normalizeText(story.title).includes(
          normalizedSearch
        ) ||
        normalizeText(story.author).includes(
          normalizedSearch
        );

      const matchesGenre =
        genre === "Todos" || story.genre === genre;

      const matchesStatus =
        status === "Todos" || story.status === status;

      return (
        matchesSearch &&
        matchesGenre &&
        matchesStatus
      );
    })
    .sort((a, b) => {
      if (sort === "title-asc") {
        return a.title.localeCompare(b.title, "pt-BR");
      }

      if (sort === "title-desc") {
        return b.title.localeCompare(a.title, "pt-BR");
      }

      return b.id - a.id;
    });

  const hasActiveFilters =
    search !== "" ||
    genre !== "Todos" ||
    status !== "Todos" ||
    sort !== "recent";

  function clearFilters() {
    navigate(
      {
        pathname: "/explorar",
        search: "",
        hash: location.hash,
      },
      { replace: true }
    );
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
        <Compass
          size={32}
          className="text-yellow-400"
        />

        <h1 className="text-3xl font-black sm:text-4xl">
          Explorar histórias
        </h1>
      </div>

      <p className="mt-3 text-gray-400">
        Descubra novos mundos, personagens e histórias
        de autores independentes.
      </p>

      {/* Área de pesquisa e filtros */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#191919] p-4 sm:p-6">
        {/* Pesquisa */}
        <div className="relative">
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              updateFilter("q", event.target.value)
            }
            placeholder="Buscar por título ou autor..."
            aria-label="Buscar histórias por título ou autor"
            className="w-full rounded-xl border border-white/10 bg-[#101010] py-3.5 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400 [&::-webkit-search-cancel-button]:hidden"
          />

          {search && (
            <button
              type="button"
              onClick={() => updateFilter("q", "")}
              aria-label="Limpar pesquisa"
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Cabeçalho dos filtros */}
        <div
          id="categorias"
          className="mt-6 flex scroll-mt-6 items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={18}
              className="text-yellow-400"
            />

            <h2 className="text-sm font-bold">
              Filtros
            </h2>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-400 transition hover:text-yellow-400"
            >
              <X size={15} />
              Limpar filtros
            </button>
          )}
        </div>

        {/* Gêneros */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-medium text-gray-400">
            Gêneros
          </p>

          <div className="flex flex-wrap gap-2">
            {genres.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  updateFilter("genre", item, "Todos")
                }
                aria-pressed={genre === item}
                className={`cursor-pointer rounded-lg border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  genre === item
                    ? "border-yellow-400 bg-yellow-400 text-black"
                    : "border-white/10 bg-[#242424] text-gray-300 hover:border-yellow-400/40 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Status e ordenação */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="story-status"
              className="mb-2 block text-xs font-medium text-gray-400"
            >
              Status
            </label>

            <select
              id="story-status"
              value={status}
              onChange={(event) =>
                updateFilter(
                  "status",
                  event.target.value,
                  "Todos"
                )
              }
              className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === "Todos"
                    ? "Todos os status"
                    : item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="story-sort"
              className="mb-2 block text-xs font-medium text-gray-400"
            >
              Ordenar por
            </label>

            <select
              id="story-sort"
              value={sort}
              onChange={(event) =>
                updateFilter(
                  "sort",
                  event.target.value,
                  "recent"
                )
              }
              className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400"
            >
              <option value="recent">
                Mais recentes
              </option>

              <option value="title-asc">
                Título (A-Z)
              </option>

              <option value="title-desc">
                Título (Z-A)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mt-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">
            Catálogo de histórias
          </h2>

          <p
            aria-live="polite"
            className="text-sm text-gray-400"
          >
            <span className="font-semibold text-yellow-400">
              {filteredStories.length}
            </span>{" "}
            {filteredStories.length === 1
              ? "história encontrada"
              : "histórias encontradas"}
          </p>
        </div>

        {filteredStories.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/15 bg-[#191919] px-6 py-16 text-center">
            <SearchX
              size={48}
              className="text-gray-600"
            />

            <h3 className="mt-5 text-xl font-bold">
              Nenhuma história encontrada
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
              Não encontramos histórias com os filtros
              selecionados. Tente pesquisar outro título,
              autor ou gênero.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
            >
              <X size={18} />
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-x-6">
            {filteredStories.map((story) => (
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
        )}
      </div>
    </section>
  );
}
