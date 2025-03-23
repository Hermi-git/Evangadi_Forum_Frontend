import Home from "./Pages/Home/Home";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import {Routes, Route, useNavigate} from "react-router-dom"
import axiosBase from "./axiosConfig";
import { createContext, useEffect, useState } from "react";

export const AppState = createContext();
function App() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  async function checkUser(){
    try {
      const {data} = await axiosBase.get("users/check", {
        headers:{
          Authorization: 'Bearer ' + token,
        },
      })
      setUser(data)
    } catch (error) {
      console.log(error.response)
      navigate('/login')
    }
  }

  useEffect(() => {
    checkUser();
  }, [])
  

  return (
    <div className="App">
      <AppState.Provider value={{user,setUser}}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/howitworks" element={<HowItWorks/>}/>
      </Routes>
      </AppState.Provider>
 </div>
)
}
export default App;
