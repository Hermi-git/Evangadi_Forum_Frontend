import React from 'react'
import logo from '../../assets/white.png'
import classes from './Footer.module.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className= {classes.container}>
        <div className={classes.link_container}>
            <div className={classes.logo_container}>
                <img src={logo} alt="logo" />
            </div>
            <div className= {classes.social_icons}>
                <li><FacebookIcon /></li>
                <li><YouTubeIcon /></li>
                <li><LinkedInIcon /></li>
            </div>
        </div>
        <div className={classes.useful_links}>
            <h3>Useful links</h3>
            <a href="/">How it works</a>
            <a href="/">Terms of Service</a>
            <a href="/">Privacy policy</a>
        </div>
        <div className={classes.useful_links}>
            <h3 >Contact Info</h3>
            <a  href="/">Evangadi Networks</a>
            <a  href="/">support@evangadi.com</a>
            <a  href="/">+1-202-386-2702</a>
        </div>
    </div>
  )
}

export default Footer