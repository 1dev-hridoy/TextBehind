
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { ToolSection } from '@/components/sections/ToolSection'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <ToolSection />
        <Features />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App