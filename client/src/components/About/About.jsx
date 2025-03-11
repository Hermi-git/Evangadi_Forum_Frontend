import React from 'react';
import classes from './About.module.css';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate=useNavigate()
    function handlehow(){
        navigate('/howitworks')
       }
  return (
     <div className={classes.about_container}>
      <h3 className={classes.about_title}>About</h3>
      <h1 className={classes.about_heading}>Evangadi Networks</h1>

      <p className={classes.about_text}>
        No matter what stage of life you are in, whether you're just starting 
        elementary school or being promoted to CEO of a Fortune 500 company, 
        you have much to offer to those who are trying to follow in your footsteps.
      </p>

      <p className={classes.about_text}>
        Whether you are willing to share your knowledge or you are just looking 
        to meet mentors of your own, please start by joining the network here.
      </p>

      <button onClick={handlehow} className={classes.about_button}>How it works</button>
    </div>
  );
}

export default About;
