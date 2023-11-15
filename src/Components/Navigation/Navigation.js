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
        if (window.innerWidth <= 960){
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
        
            
                <div className="container">
                    <nav className="navbar">
                        <div className="navbar-container"> 
                        <Link to="/" className="nabar-logo" onClick={closeMoileWindow}> Estate Agent</Link>
                        <div className="menu-icon" onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                        </div>   
                        <ul className={click ? 'nav-menu active' : 'nav-menu '}>
                            <li className="nav-item">
                                <Link to='/properties' className="'nav-links" onClick={closeMoileWindow}>
                                    Properties
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/sellers' className="'nav-links" onClick={closeMoileWindow}>
                                    Sellers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/buyers' className="'nav-links" onClick={closeMoileWindow}>
                                    Buyers
                                </Link>
                            </li>
                        </ul>
                        </div>
                    </nav>  
                    <Route exact path="/"><LandingPage/></Route>
                    <Route index element={<Property/>}/> {/*This is the default component shown in the <Outlet> tag */}
                    <Route path="property" element={<Property/>}/>
                    <Route path="seller" element={<Seller/>}/>
                    <Route path="seller/:sellerId/property" element={<SellerProperty/>}/>
                    <Route path="buyer" element={<Buyer/>}/>
                    <Route path="property/:propertyId/booking" element={<Booking/>}/>
                    <Route path="/:id"></Route>
                </div> 
                    
                
                
            
            
        
        );
    }
