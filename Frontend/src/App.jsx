import React from 'react'
import Navbar from './Components/Navbar'
import Home  from './Components/Hero'
import Tabs  from './Components/Tabs'
import About  from './Components/About'
import Footer  from './Components/Footer'

function App() {
  return (
    <div>
        <Navbar />
        <Home />
        <Tabs />
        <About />
        <Footer />
    </div>
  )
}

export default App