import {BrowserRouter, Route, Routes,Link} from "react-router-dom";
import './Navigation.css';
import React, { useContext, useEffect, useState } from "react";



function Navigation() {

    //use State is used to update the state if user has clicked on hamburger icon
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    //Arrow function used to change the state of the responsive menu
    //i.e. hamburger icon to x 
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
        
            
               
                    <nav className="navbar">

                    <Link to="/"  className="navbar-logo">
                        QA Real Estate
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        {/**if click is set to true, then the x icon will display, if not, the default hamburger icon will display */}
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>  
                    <ul className={click ? 'nav-menu active' : 'nav-menu '}>  
                        <li className="nav-item">
                            <Link to="/property" className="nav-links" onClick={closeMoileWindow}>
                                Properties
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/seller" className="nav-links" onClick={closeMoileWindow}>
                                Sellers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/buyer" className="nav-links" onClick={closeMoileWindow}>
                                Buyers
                            </Link>
                        </li>
                    </ul>            
                    </nav>
                    );
                      {/** <div className="navbar-container"> 
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
                   </div>
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
                    
               
                    
                </> **/}
                     
        
    }

    export default Navigation;