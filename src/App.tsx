import IndexPage from "./Components/IndexPage";
import SignIn from "./Components/SignIn";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
// import {Route, Routes} from "react-router-dom"
import {Route, Routes} from  "react-router-dom"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
    // <Routes>
    //   <Route path="/" element={ <IndexPage/>} />
    // </Routes>
    // <>
    //   {/* <IndexPage/> */}
    //   <Signup/>
    // </>
  )
}

export default App;
