import {BrowserRouter, Route, Routes,Link} from "react-router-dom";
import './Navigation.css';
import React, { useContext, useEffect, useState } from "react";
import LandingPage from "../LandingPage/LandingPage";
import Seller from "../Seller/Seller";
import {Button} from "../Button/Button"
import Property from "../Property/Property";
import Buyer from "../Buyer/Buyer";
import Booking from "../Booking/Booking";
import SellerProperty from "../Seller/SellerProperty";


export default function Navigation() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMoileWindow =() => setClick(false);
    const showButton =() => {
        if (window.innerWidth <= 979){
            setButton(false)
        }
        else{
            setButton(true)
        }
    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);
    return (
        
            
               // <div className="container">
                    <nav className="navbar">
                        <div className="navbar-container"> 
                        <div className="menu-icon" onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                        </div>   
                        <ul className={click ? 'nav-menu active' : 'nav-menu '}>
                            <li className="nav-item">
                                <Link to='/property' className="nav-links" onClick={closeMoileWindow}>
                                    Properties
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/seller' className="nav-links" onClick={closeMoileWindow}>
                                    Sellers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/buyer' className="nav-links" onClick={closeMoileWindow}>
                                    Buyers
                                </Link>
                            </li>
                        </ul>
                        </div>
                    </nav> 
                   // </div>
                /**<>
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
                    
               
                    
                </> **/
                    
                
                
            
            
        
        );
    }
