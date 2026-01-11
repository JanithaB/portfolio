import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 selection:bg-teal-300 selection:text-slate-900">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
