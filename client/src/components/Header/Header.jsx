import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import black from "../../assets/black.png";

function Header() {
    return(
        <header className={classes.header}>
            <div className={classes.logo}>
                <img src={black} alt="logo" />
            </div>
            <nav>
                <Link to={'/'} className={classes.nav_link}>Home</Link>
                <Link to={"/howitworks"} className={classes.nav_link}>How it Works</Link>
                <Link to={"/login"} className={classes.nav_btn}>SIGN IN </Link>
            </nav>
        </header>
    );
}

export default Header;