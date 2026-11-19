
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LatestReleases } from './components/LatestReleases'

function App() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <Header />

      <main>
        <Hero />
        <LatestReleases />
      </main>
    </div>
  )
}

export default App
