
import { Header } from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-4xl font-bold">
          Bem-vindo à Quadria!
        </h1>

        <p className="mt-4 text-gray-400">
          Descubra mangás, quadrinhos e webtoons
          de artistas independentes.
        </p>
      </main>
    </div>
  )
}

export default App
