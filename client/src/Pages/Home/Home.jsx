import React, { useContext } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { AppState } from '../../App'
import classes from "./Home.module.css"
import { Link } from 'react-router-dom'
import Questions from '../Questions/Questions'


function Home() {
  const {user} = useContext(AppState)
  return (
    <div>
    <Header/>
    <div className={classes.question_header}>
      <button className={classes.ask_btn}> <Link className={classes.ask_question}to={"/ask"}>Ask Question</Link> </button>
      <h2 >welcome: <span className={classes.welcome_user}>{user?.username}</span></h2>
    </div>
    < Questions/>
    <Footer/>
    </div>
  )
}

export default Home