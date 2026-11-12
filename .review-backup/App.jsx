import { Route, Routes } from "react-router-dom"
import Header from "./User/Components/Header"
import Home from "./User/Page/Home"
import Footer from "./User/Components/Footer"
import FloatingContact from "./User/Components/FloatingContact";

function App() {

  return (
    <>
<Header/>
<FloatingContact />
<Routes>
  <Route path="/" element={<Home/>}/>
</Routes>
<Footer/>

    </>
  )
}

export default App
