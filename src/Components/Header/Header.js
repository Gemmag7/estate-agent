import {Link} from "react-router-dom";
import './Header.css';
import React from "react";
import Navigation from "../Navigation/Navigation";

function Header() {
    return (
        <>
        <div className="fixed-top container" style={{backgroundColor: "white"}}> 
                <div className="header">
                <Link to="/" className="col-sm block">
                        Estate Agent
                    </Link>
                    </div>
               <Navigation/>
                
            </div>
        </>
        );
    }
export default Header;