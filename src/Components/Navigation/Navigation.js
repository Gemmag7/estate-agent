import {Link, Outlet} from "react-router-dom";
import './Navigation.css';
import React from "react";

function Navigation() {
    return (
        <>
            
                <nav className="row">
                    <Link to="/property" className="col-sm nav-menu">
                        <i className="bi bi-house-fill"></i>&nbsp;Properties
                    </Link>
                    <Link to="/seller" className="col-sm nav-menu">
                        <i className="bi bi-person-square"></i>&nbsp;Sellers
                    </Link>
                    <Link to="/buyer" className="col-sm nav-menu">
                        <i className="bi bi-basket3-fill"></i>&nbsp;Buyers
                    </Link>
                </nav>
                
            
            
        </>
        );
    }
export default Navigation;