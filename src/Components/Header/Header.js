import {Link, Outlet} from "react-router-dom";
import '../LandingPage/LandingPage.css';
import React from "react";
import Navigation from "../Navigation/Navigation";

function Header() {
    return (
        <>
        <div className="fixed-top container" style={{backgroundColor: "white"}}>
                <div className="header">
                <Link to="/" className="col-sm block">
                        &nbsp;Estate Agent 2
                    </Link>
                    </div>
               <Navigation/>
                
            </div>
        </>
        );
    }
export default Header;