
import { BookOpen, Bookmark, Star, Tag } from 'lucide-react'
import eclipseBanner from '../assets/eclipse-banner.png'

export function Hero() {
  return (
    <section className="relative isolate min-h-[480px] overflow-hidden bg-[#111111] xl:min-h-[540px] 2xl:min-h-[600px]">
      {/* Ilustração de fundo */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center 2xl:bg-[position:center_40%]"
        style={{ backgroundImage: `url(${eclipseBanner})` }}
      />

      {/* Gradiente para manter os textos legíveis */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101010] via-[#101010]/75 to-transparent" />

      <div className="mx-auto flex min-h-[480px] max-w-7xl items-center px-6 py-12 xl:min-h-[540px] 2xl:min-h-[600px] 2xl:max-w-[1440px]">
        <div className="max-w-[570px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-4 py-2 text-sm font-bold uppercase text-yellow-400">
            <Star size={17} fill="currentColor" />
            História em destaque
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
            <Tag size={17} />
            <span>Fantasia</span>
            <span>•</span>
            <span>Aventura</span>
            <span>•</span>
            <span>Ação</span>
          </div>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
            Crônicas do
            <span className="block text-yellow-400">
              Eclipse
            </span>
          </h1>

          <p className="mt-5 max-w-[520px] text-base leading-7 text-gray-300">
            Em um mundo onde o sol está desaparecendo,
            uma jovem aventureira descobre um poder capaz
            de mudar o destino de todos. Uma jornada entre
            luz, sombras e segredos esquecidos.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-xl bg-yellow-400 px-7 py-4 font-bold text-black transition hover:bg-yellow-300"
            >
              <BookOpen size={21} />
              Começar a ler
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-xl border border-white/60 bg-black/30 px-6 py-4 font-medium text-white transition hover:bg-white/10"
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
