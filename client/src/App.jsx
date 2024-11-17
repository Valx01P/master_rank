import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import RestlessRestArea from "./pages/RestlessRestArea"
import Arena from "./pages/Arena"
import { useEffect } from "react"

function App() {

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.body.classList.add(savedTheme)
    } else {
      document.body.classList.add('dark')
    }
  }, [])

  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={< RestlessRestArea />}/>
          <Route path="/arena" element={< Arena />}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App
