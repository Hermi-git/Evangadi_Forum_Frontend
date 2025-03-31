import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import black from "../../assets/black.png";
import { AppState } from "../../App";

function Header() {
    const { user, setUser } = useContext(AppState);
    const navigate = useNavigate();
    
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null); 
        navigate("/login"); 
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <img src={black} alt="logo" />
            </div>
            <nav>
                <Link to="/" className={classes.nav_link}>Home</Link>
                <Link to="/howitworks" className={classes.nav_link}>How it Works</Link>
                {user ? (
                    <button className={classes.nav_btn} onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login" className={classes.nav_btn}>Sign In</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
