import React ,{ useRef } from "react";
import "./PropertySearch.css"
import { useNavigate } from "react-router-dom";
import ViewProperties from "./ViewProperties";




// Passing an object into the function which is generated from the form for the properties table.
// Properties form is as it says a property form, props is the properties of the object.
const PropertySearch = (props)=> {
    
    const searchHandler = props.searchHandler;
    // Refs are used to get the values from the form, the property form method is called with the parameter of this.props
    // props then uses the useRef hooks in order to get the value .
    const pTypeRef = useRef();
    const statusRef = useRef();
    const priceRef = useRef();
    const bedroomNoRef = useRef();
    const bathroomNoRef = useRef();
    const hasGardenRef = useRef();

    const searchProperties = () => {
        searchHandler(
            {
                type: pTypeRef.current.value,
                status: statusRef.current.value,
                price: priceRef.current.value,
                bedroom: bedroomNoRef.current.value,
                bathroom: bathroomNoRef.current.value,
                garden: hasGardenRef.current.value
            }
        );
    };
    let clearValues = () => {
      
        pTypeRef.current.value = "ANY";
        statusRef.current.value = "ANY";
        priceRef.current.value = 0;
        bedroomNoRef.current.value = 0;
        bathroomNoRef.current.value = 0;
        hasGardenRef.current.value = "ANY";

        
    };
    return (
        
        <form className="pform">
            <h1>Property Search and Bookings</h1>
            <div className="row">
                
                <div className="form-group col">
                <p htmlFor="formType"> <i className="fa fa-home " ></i> Type</p>
                <select  className="form-select" id="type" ref={pTypeRef} >
                    <option value="ANY">Any</option>
                    <option value="DETACHED">Detached</option>
                    <option value="SEMI">Semi</option>
                    <option value="APARTMENT">Apartment</option>
                </select>
                </div>
                <div className="form-group col">
                <p htmlFor="formPrice"> <i className="fa fa-money"></i>Price</p>
                <select  className="form-select" ref={priceRef}>
                    <option value="0">Any</option>
                    <option value="50000">Up to 50000</option>
                    <option value="100000">Up to 100000</option>
                    <option value="200000">Up to 200000</option>
                    <option value="300000">Up to 300000</option>
                    <option value="400000">Up to 400000</option>
                </select>
                </div>
                <div className="form-group col">
                <p htmlFor="formStatus"><i class="fa fa-cart-plus"></i>Status</p>
                <select  className="form-select" ref={statusRef}>
                    <option value="ANY">Any</option>
                    <option value="SOLD">SOLD</option>
                    <option value="FOR SALE">FOR SALE</option>
                    <option value="WITHDRAWN">WITHDRAWN</option>
                </select>
                </div>
                <div className="form-group col">
                <p htmlFor="numberOfBedrooms"><i class="fa fa-bed"></i>Bedrooms</p>
                <select  className="form-select" ref={bedroomNoRef}>
                    <option value="0">Any</option>
                    <option value="1">Minimum 1</option>
                    <option value="2">Minimum 2</option>
                    <option value="3">Minimum 3</option>
                    <option value="4">Minimum 4</option>
                    <option value="5">Minimum 5</option>
                </select>
            </div>
            <div className="form-group col">
                <p htmlFor="numberOfBathrooms"><i class="fa fa-bathtub"></i> Bathrooms</p>
                <select className="form-select" ref={bathroomNoRef}>
                    <option value="0">Any</option>
                    <option value="1">Minimum 1</option>
                    <option value="2">Minimum 2</option>
                    <option value="3">Minimum 3</option>
                </select>
            </div>
            <div className="form-group col">
                <p htmlFor="numberOfGardens"> <i className="fa fa-tree"></i> Garden</p>
                <select className="form-select" ref={hasGardenRef}>
                    <option value="ANY">Any</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>
            <div className="text-center">
                <button type="button" className="btnSearch" onClick={searchProperties}>
                <i className="fa fa-search" style={{color: "#fff"}}></i>&nbsp;Search</button>
                
                <button type="button" className="btnClear" onClick={clearValues} > 
                <i className="fa fa-times" style={{color: "#fff"}}></i>&nbsp;Clear</button>
                
            </div>
            </div>
        </form>);
};

export default PropertySearch;