import { Route, Routes } from "react-router-dom"
import Header from "./User/Components/Header"
import Home from "./User/Page/Home"
import Footer from "./User/Components/Footer"

function App() {

  return (
    <>

<Header/>
<Routes>
  <Route path="/" element={<Home/>}/>
</Routes>
<Footer/>

    </>
  )
}

export default App
