import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import RestlessRestArea from "./pages/RestlessRestArea"
import Arena from "./pages/Arena"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={< RestlessRestArea />}/>
        <Route path="/arena" element={< Arena />}/>
      </Routes>
    </Router>
  )
}

export default App
