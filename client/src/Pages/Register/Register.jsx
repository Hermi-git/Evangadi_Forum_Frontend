import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosBase from '../../axiosConfig';
import classes from "./Register.module.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import About from "../../components/About/About";
import bgImage from "../../assets/bg.jpg";
console.log(bgImage);

function Register() {
  const usernameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Apply background image to the body
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      // Cleanup: Remove background when component unmounts
      document.body.style.background = "";
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!usernameValue || !firstNameValue || !lastNameValue || !emailValue || !passwordValue) {
      alert('Please fill all the fields');
      return;
    }

    try {
      await axiosBase.post('users/register', {
        username: usernameValue,
        firstname: firstNameValue,
        lastname: lastNameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert('User registered successfully');
      navigate('/');
    } catch (error) {
      alert('Something went wrong');
      console.log(error);
    }
  }

  return (
    <div className={classes.pageWrapper}>
      <Header />
      <div className={classes.container}>
        <div className={classes.contentWrapper}>
          <div>
            <form onSubmit={handleSubmit} className={classes.register_form}>
              <div className={classes.title}>
                <h2>Join the Network</h2>
                <p className={classes.login}>
                  Already have an account? <Link to={'/login'}>Login</Link>
                </p>
              </div>

              <div className={classes.input_field}>
                <input ref={usernameDom} type="text" placeholder="Username" />
              </div>

              <div className={classes.user}>
                <div className={classes.input_field}>
                  <input ref={firstNameDom} type="text" placeholder="First Name" />
                </div>
                <div className={classes.input_field}>
                  <input ref={lastNameDom} type="text" placeholder="Last Name" />
                </div>
              </div>

              <div className={classes.input_field}>
                <input ref={emailDom} type="email" placeholder="Email" />
              </div>

              <div className={classes.input_field}>
                <input ref={passwordDom} type="password" placeholder="Password" />
              </div>

              <p className={classes.agree}>
                I agree to <Link to={'/privacy'}>Privacy policy</Link> and <Link to={'/services'}>Terms of services</Link>
              </p>

              <div>
                <button type='submit'>Agree and Join</button>
              </div>

              <p className={classes.login}>
                <Link to={'/login'}>Already have an account?</Link>
              </p>
            </form>
          </div>
          <div className={classes.about_section}>
            <About />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
