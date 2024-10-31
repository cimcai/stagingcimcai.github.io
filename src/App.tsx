import './styles/App.css'
import { CIMCLogo, ResponsiveCIMCLogo } from './components/CIMCLogo'
import Header from './components/Header'
import Footer from './components/Footer'
import Forward from './Forward'
import Institute from './Institute'
import Contact from './Contact'
import Library from './Library'

function App() {
  return (
    <>
      <div className="bg-black text-white selection:text-white selection:bg-gray-500">
        <div className="bg-cimc-blue">
          <Header />
          <div className="flex bg-transparent justify-center items-center max-md:px-6 pt-60 md:pb-40 max-md:pb-6">
            <CIMCLogo />
          </div>
          <ResponsiveCIMCLogo />

          <Forward />
        </div>

        <div className="bg-white text-black selection:text-black selection:bg-gray-500 flex justify-center px-6 pt-10 pb-40">
          <div className="md:w-[729px]">
            <div className="md:flex flex-row mr-auto items-start">
              <Institute />
              <Contact />
            </div>
          </div>
        </div>

        <Library />

        <Footer />
      </div>
    </>
  )
}

export default App
