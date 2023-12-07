//Importing all required imports for App.js to run
import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import LandingPage from "./Components/LandingPage/LandingPage";
import AddSeller from "./Components/Seller/AddSeller";
import ViewBuyers from "./Components/Buyer/ViewBuyers";
import SellerProperty from "./Components/Seller/SellerProperty";
import Booking from "./Components/Booking/Booking";
import Property from "./Components/Property/Property";
import ViewProperties from "./Components/Property/ViewProperties";
import AddProperty from "./Components/Property/AddProperty";
import WithdrawProperty from "./Components/Property/WithdrawProperty";
import ViewSellers from "./Components/Seller/ViewSellers";
import DeleteSeller from "./Components/Seller/DeleteSeller";
import EditProperty from "./Components/Property/EditProperty";
import Resubmit from "./Components/Property/Resubmit";
import EditSeller from "./Components/Seller/EditSeller";
import  Navbar  from "./Components/Navigation/Navbar";
import EditBuyer from "./Components/Buyer/EditBuyer";
function App() {
    return (
        
        <Router>
        <Navbar/>
            <Routes>
                <Route path="/" element={<LandingPage/>}> {/*This is the root path*/}
                    <Route index element={<ViewProperties/>}/> {/*This is the default component shown in the <Outlet> tag */}
                    <Route path="property" element={<ViewProperties/>}/>
                    <Route path="/property/add" element={<AddProperty/>}/>
                    <Route path ="/seller" element={<ViewSellers/>}/>
                    <Route path ="/seller/:id" element={<DeleteSeller/>}/>
                    <Route path ="/seller/:id/edit" element={<EditSeller/>}/>
                    <Route path ="/seller/add" element={<AddSeller/>}/>
                    <Route path="seller/:sellerId/property" element={<SellerProperty/>}/>
                    <Route path="buyer" element={<ViewBuyers/>}/>
                    <Route path ="/buyer/:id/edit" element={<EditBuyer/>}/>
                   {/**  <Route path ="/buyer/add" element={<AddBuyer/>}/>*/}
                   <Route path="/property/:id/resubmit" element={<Resubmit/>}/>
                    <Route path="/property/:id/withdraw" element={<WithdrawProperty/>}/>
                    <Route path="/property/:propertyId/booking" element={<Booking/>}/>
                    <Route path="/property/:id/edit" element={<EditProperty/>}/>
                    
                    {/*<Route path="*" element={<NoPage/>}/>*/}
                </Route>
            </Routes>
        </Router>
       
    );
}

//Exporting App component to display in Index.js when called <App/>
export default App;
