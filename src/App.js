//Importing all required imports for App.js to run
import "./App.css";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import LandingPage from "./Components/LandingPage/LandingPage";
import Seller from "./Components/Seller/Seller";
import Buyer from "./Components/Buyer/Buyer";
import SellerProperty from "./Components/Seller/SellerProperty";
import Booking from "./Components/Booking/Booking";
import Property from "./Components/Property/Property";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}> {/*This is the root path*/}
                    <Route index element={<Property/>}/> {/*This is the default component shown in the <Outlet> tag */}
                    <Route path="property" element={<Property/>}/>
                    <Route path="seller" element={<Seller/>}/>
                    <Route path="seller/:sellerId/property" element={<SellerProperty/>}/>
                    <Route path="buyer" element={<Buyer/>}/>
                    <Route path="property/:propertyId/booking" element={<Booking/>}/>
                    {/*<Route path="*" element={<NoPage/>}/>*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

//Exporting App component to display in Index.js when called <App/>
export default App;
