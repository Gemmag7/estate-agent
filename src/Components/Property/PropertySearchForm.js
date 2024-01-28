import React, {useRef} from "react";
import "./PropertyForm.css";


const PropertySearchForm = (props) => {

    const searchHandler = props.searchHandler;
    //setting the search handler function in a varibale for easier use, extracted via the prop which has been passed down containing the function
 
     const typeRef = useRef();
     const bedroomsRef = useRef();
     const bathroomsRef = useRef();
     const gardenRef = useRef();
     const priceRef = useRef();
     const statusRef = useRef();
 
 
     const doSearch = () => {
         searchHandler(
             {
                 type: typeRef.current?.value,
                 bedroom: bedroomsRef.current?.value,
                 bathroom: bathroomsRef.current?.value,
                 garden: gardenRef.current?.value,
                 price: priceRef.current?.value,
                 status: statusRef.current?.value
             }
         );
     }
       

        
    
    const doReset = () => {
        
        typeRef.current.value = "ANY";
        bedroomsRef.current.value = 0;
        bathroomsRef.current.value = 0;
        gardenRef.current.value = "ANY";
        priceRef.current.value = 0;
        statusRef.current.value = "ANY";

       // doSearch();
       
    };

    return (
        <>
        <form className="pform">
        <h1>Property Search and Bookings</h1>
        <div className="row">
        <div className="row">
            <div className="form-group col">
                <label htmlFor="propertyType" ><i class="fas fa-home"></i>&nbsp;Type</label>
                <select className="form-select" ref={typeRef}>
                    <option value="ANY">Any</option>
                    <option value="DETACHED">Detached</option>
                    <option value="SEMI">Semi</option>
                    <option value="APARTMENT">Apartment</option>
                </select>
            </div>
            <div className="form-group col">
                <label htmlFor="propertyPrice"><i class="fas fa-money-bill-wave"></i>&nbsp;Price</label>
                <select className="form-select" ref={priceRef}>
                    <option value="0">Any</option>
                    <option value="50000">Up to £50,000</option>
                    <option value="100000">Up to £100,000</option>
                    <option value="200000">Up to £200,000</option>
                    <option value="300000">Up to £300,000</option>
                    <option value="400000">Up to £400,000</option>
                </select>
            </div>
            <div className="form-group col">
                <label htmlFor="propertyStatus" ><i class="fa fa-cart-plus"></i>Status</label>
                <select  className="form-select" ref={statusRef}>
                    <option value="ANY">Any</option>
                    <option value="SOLD">SOLD</option>
                    <option value="FOR SALE">FOR SALE</option>
                    <option value="WITHDRAWN">WITHDRAWN</option>
                </select>
                </div>
            <div className="form-group col">
                <label htmlFor="numberOfBedrooms"><i class="fas fa-bed"></i>&nbsp;Bedrooms</label>
                <select className="form-select" ref={bedroomsRef}>
                    <option value="0">Any</option>
                    <option value="1">Minimum 1</option>
                    <option value="2">Minimum 2</option>
                    <option value="3">Minimum 3</option>
                    <option value="4">Minimum 4</option>
                    <option value="5">Minimum 5</option>
                </select>
            </div>
            <div className="form-group col">
                <label htmlFor="numberOfBathrooms"><i class="fas fa-bath"></i>&nbsp;Bathrooms</label>
                <select className="form-select" ref={bathroomsRef}>
                    <option value="0">Any</option>
                    <option value="1">Minimum 1</option>
                    <option value="2">Minimum 2</option>
                    <option value="3">Minimum 3</option>
                </select>
            </div>
            <div className="form-group col">
                <label htmlFor="numberOfGardens"><i class="fas fa-tree"></i>&nbsp;Garden</label>
                <select className="form-select" ref={gardenRef}>
                <option value="0">Any</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>
        </div>
        <div className="text-center">
                <button type="button" className="btnSearch" onClick={doSearch}>
                <i className="fa fa-search" style={{color: "#fff"}}></i>&nbsp;Search</button>
                
                <button type="button" className="btnClear" onClick={doReset} > 
                <i className="fa fa-times" style={{color: "#fff"}}></i>&nbsp;Clear</button>
                
            </div>
            </div>
    </form>
    </>);
};

export default PropertySearchForm;