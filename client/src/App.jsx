import Home from "./Pages/Home/Home";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Header from "./components/Header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import axiosBase from "./axiosConfig";
import { createContext, useEffect, useState } from "react";
import Ask from "./Pages/Ask/Ask";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      if (!token) return;
      const { data } = await axiosBase.get("users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, [token]);

  return (
    <div className="App">
      <AppState.Provider value={{ user, setUser }}>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/ask" element={<Ask/>}/>
        </Routes>
      </AppState.Provider>
    </div>
  );
}

export default App;
