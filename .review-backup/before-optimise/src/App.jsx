import { Route, Routes } from "react-router-dom"
import { MotionConfig } from "motion/react"
import Header from "./User/Components/Header"
import Home from "./User/Page/Home"
import Footer from "./User/Components/Footer"
import FloatingContact from "./User/Components/FloatingContact";

function App() {

  return (
    <MotionConfig reducedMotion="user">
<Header/>
<FloatingContact />
<Routes>
  <Route path="/" element={<Home/>}/>
</Routes>
<Footer/>

    </MotionConfig>
  )
}

export default App
