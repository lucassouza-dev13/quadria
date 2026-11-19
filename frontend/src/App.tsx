
import { Route, Routes } from 'react-router'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LatestReleases } from './components/LatestReleases'
import { StoryDetails } from './pages/StoryDetails'
import { ChapterReader } from './pages/ChapterReader'

function Home() {
  return (
    <>
      <Hero />
      <LatestReleases />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/historias/:slug"
            element={<StoryDetails />}
          />

          <Route
            path="/historias/:slug/capitulos/:chapterId"
            element={<ChapterReader />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
