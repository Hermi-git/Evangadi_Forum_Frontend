import React, { useState, useRef, useContext } from "react";
import axiosBase from "../../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Login.module.css";
import About from "../../components/About/About";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { AppState } from "../../App";

function Login() {
  const { setUser } = useContext(AppState);
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [errorFields, setErrorFields] = useState({ email: false, password: false });

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    setErrorFields({ email: false, password: false });

    if (!emailValue || !passwordValue) {
      setAlert({ message: "Please fill all the fields", type: "error" });
      setErrorFields({ email: !emailValue, password: !passwordValue });
      return;
    }

    try {
      const { data } = await axiosBase.post("users/login", {
        email: emailValue,
        password: passwordValue,
      });

      setAlert({ message: "User logged in successfully!", type: "success" });
      localStorage.setItem("token", data.token);
      setUser(data.user); 

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setAlert({ message: error?.response?.data?.msg || "Something went wrong", type: "error" });

      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
    }
  }

  return (
    <div className={classes.pageWrapper}>
      <Header />
      <div className={classes.container}>
        <div className={classes.contentWrapper}>
          <form onSubmit={handleSubmit} className={classes.login_form}>
            <div className={classes.title}>
              <h2>Login to your account</h2>
              <p className={classes.register}>
                Don't have an account? <Link to="/register">Create a new account</Link>
              </p>
            </div>

            {alert.message && (
              <div className={`${classes.alert} ${alert.type === "success" ? classes.success : classes.error}`}>
                {alert.message}
              </div>
            )}

            <div className={`${classes.input_field} ${errorFields.email ? classes.errorField : ""}`}>
              <input ref={emailDom} type="email" placeholder="Email" />
            </div>

            <div className={`${classes.input_field} ${errorFields.password ? classes.errorField : ""}`}>
              <input ref={passwordDom} type="password" placeholder="Password" />
            </div>

            <button type="submit">Login</button>
          </form>

          <div className={classes.about_section}>
            <About />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
