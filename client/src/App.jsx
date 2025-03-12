import Home from "./Pages/Home/Home";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/howitworks" element={<HowItWorks/>}/>
      </Routes>
 </div>
)
}
export default App;
