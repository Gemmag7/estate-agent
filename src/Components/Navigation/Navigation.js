import {Link, Outlet} from "react-router-dom";
import '../LandingPage/LandingPage.css';
import React from "react";

function Navigation() {
    return (
        <>
        
                <nav className="row">
                    <Link to="/property" className="col-sm block">
                        <i className="bi bi-house-fill"></i>&nbsp;Properties
                    </Link>
                    <Link to="/seller" className="col-sm block">
                        <i className="bi bi-person-square"></i>&nbsp;Sellers
                    </Link>
                    <Link to="/buyer" className="col-sm block">
                        <i className="bi bi-basket3-fill"></i>&nbsp;Buyers
                    </Link>
                </nav>
                <hr/>
            
        </>
        );
    }
export default Navigation;