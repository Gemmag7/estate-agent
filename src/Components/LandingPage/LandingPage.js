import {Link, Outlet} from "react-router-dom";
import './LandingPage.css';
import '../Header/Header.css'
import React from "react";
import Header from "../Header/Header";
function LandingPage() {
    return (
        <>
        
            <Header/>
            <div className="container">
                <Outlet/>
            </div>
        </>
    );
}

export default LandingPage;
