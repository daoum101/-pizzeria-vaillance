
import Hero from './sections/Hero'
import Signature from './sections/Signature'
import Menu from './sections/Menu'
import Experience from './sections/Experience'
import Reviews from './sections/Reviews'
import Contact from './sections/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="site">
      <Hero />
      <Signature />
      <Menu />
      <Experience />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  )
}
