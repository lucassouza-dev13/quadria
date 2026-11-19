
import { BookOpen, Bookmark, Star, Tag } from 'lucide-react'
import eclipseBanner from '../assets/eclipse-banner.png'

export function Hero() {
  return (
    <section className="relative isolate min-h-[480px] overflow-hidden bg-[#111111] xl:min-h-[540px] 2xl:min-h-[600px]">
      {/* Ilustração de fundo */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-[position:60%_center] sm:bg-center 2xl:bg-[position:center_40%]"
        style={{ backgroundImage: `url(${eclipseBanner})` }}
      />

      {/* Gradiente para dispositivos móveis */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101010]/95 via-[#101010]/80 to-[#101010]/45 sm:bg-gradient-to-r sm:from-[#101010] sm:via-[#101010]/75 sm:to-transparent" />

      {/* Conteúdo */}
      <div className="mx-auto flex min-h-[480px] max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-12 xl:min-h-[540px] 2xl:min-h-[600px] 2xl:max-w-[1440px]">
        <div className="max-w-[570px]">
          {/* Destaque */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-4 py-2 text-xs font-bold uppercase text-yellow-400 sm:mb-7 sm:text-sm">
            <Star size={17} fill="currentColor" />
            História em destaque
          </div>

          {/* Gêneros */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
            <Tag size={17} />
            <span>Fantasia</span>
            <span>•</span>
            <span>Aventura</span>
            <span>•</span>
            <span>Ação</span>
          </div>

          {/* Título */}
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
            Crônicas do
            <span className="block text-yellow-400">
              Eclipse
            </span>
          </h1>

          {/* Sinopse */}
          <p className="mt-5 max-w-[520px] text-sm leading-6 text-gray-200 sm:text-base sm:leading-7 sm:text-gray-300">
            Em um mundo onde o sol está desaparecendo,
            uma jovem aventureira descobre um poder capaz
            de mudar o destino de todos. Uma jornada entre
            luz, sombras e segredos esquecidos.
          </p>

          {/* Botões */}
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-7 sm:gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-black transition hover:bg-yellow-300 sm:px-7 sm:py-4"
            >
              <BookOpen size={21} />
              Começar a ler
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-xl border border-white/60 bg-black/40 px-6 py-3.5 font-medium text-white transition hover:bg-white/10 sm:bg-black/30 sm:py-4"
            >
              <Bookmark size={21} />
              Adicionar à biblioteca
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
