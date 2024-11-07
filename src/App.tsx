import './styles/App.css'
import Footer from './components/Footer'
import Institute from './pages/Institute'
import Library from './pages/Library'
import Home from './pages/Home'
import Navbar from './components/NavBar'
import { Button } from 'react-scroll'
import { useCallback, useEffect, useState } from 'react'
import Team from './pages/Team'
import Projects from './pages/Projects'
import Mission from './pages/Mission'

function App() {
  const scrollThreshHold = 550;
  const [shouldShowScollButton, setShouldShowScollButton] = useState(false);

  const scrollEventHandler = (useCallback(() => {
    if (window.scrollY > scrollThreshHold && !shouldShowScollButton) {
    setShouldShowScollButton(true)
    } else if (window.scrollY <= scrollThreshHold && shouldShowScollButton){
    setShouldShowScollButton(false)
    }
  }, [shouldShowScollButton]))

  useEffect(()=> {
    if (scrollThreshHold) {
      window.addEventListener('scroll', scrollEventHandler)
      return ()=> window.removeEventListener('scroll', scrollEventHandler)
    }
  }, [scrollEventHandler])

  return (
    <div>
      <Navbar shouldBeTransparent={!shouldShowScollButton}/>
      <Home />
      <div className="bg-white text-black selection:text-black selection:bg-gray-500 flex justify-center px-6 pt-10">
        <div className="md:w-[729px]">
          <Institute />
          <Mission />
        </div>
      </div>
      <Projects />
      <Team />
      <Library />
      <Footer />

      {shouldShowScollButton &&
        <Button to="home" duration={400} smooth className="cursor-pointer text-xl fixed right-6 bottom-6">
          <img src="https://cdn.prod.website-files.com/60a87b9152279b01a9a63d20/60ad2e17b34f1902151d7e15_back-to-top.svg" loading="lazy" alt="Back to top" />
        </Button>
      }
    </div>
  )
}

export default App
