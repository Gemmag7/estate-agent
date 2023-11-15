import { Outlet} from "react-router-dom";
import './LandingPage.css';
//import '../Header/Header.css'
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
function LandingPage() {
    return (
        <>
        
            <Header/>
            <div className="container">
                <Outlet/>
            </div>
           <Footer/>
        </>
    );
}

export default LandingPage;
