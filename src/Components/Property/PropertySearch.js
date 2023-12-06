import React, { useRef, useState } from "react";
import "./PropertySearch.css";

const PropertySearch = (props) => {
  

    const searchHandler = props.searchHandler;
    
    const pTypeRef = useRef();
    const bedroomNoRef = useRef();
    const priceRef = useRef();
    const bathroomNoRef = useRef();
    const hasGardenRef = useRef();

    /**
     * 
     */
    const doSearch = () => {
        searchHandler({
            type: pTypeRef.current.value,
            bedroom: bedroomNoRef.current.value,
            bathroom: bathroomNoRef.current.value,
            garden: hasGardenRef.current.value,
            price: priceRef.current.value,
        });

        console.log(pTypeRef)
        console.log(searchHandler.current.value)
        
    };

    const doReset = () => {
        pTypeRef.current.value="Any";
        bedroomNoRef.current.value = "0";
        bathroomNoRef.current.value = "0";
        hasGardenRef.current.value="Any";
        priceRef.current.value= "0";
        
    };

    return (
        <form>
            
            <div className="row">
                <div className="form-group col">
                    <label htmlFor="propertyType">
                        <i className="fas fa-home"></i>&nbsp;Type
                    </label>
                    <select className="form-select" ref={pTypeRef}>
                        <option value="ANY">Any</option>
                        <option value="DETACHED">Detached</option>
                        <option value="SEMI">Semi</option>
                        <option value="APARTMENT">Apartment</option>
                    </select>
                </div>
                <div className="form-group col">
                    <label htmlFor="propertyPrice">
                        <i className="fas fa-money-bill-wave"></i>&nbsp;Price
                    </label>
                    <select
                        className="form-select" ref={priceRef} >
                        <option value="0">Any</option>
                        <option value="50000">Up to £50,000</option>
                        <option value="100000">Up to £100,000</option>
                        <option value="200000">Up to £200,000</option>
                        <option value="300000">Up to £300,000</option>
                        <option value="400000">Up to £400,000</option>
                    </select>
                </div>
                <div className="form-group col">
                    <label htmlFor="numberOfBedrooms">
                        <i className="fas fa-bed"></i>&nbsp;Bedrooms
                    </label>
                    <select className="form-select" ref={bedroomNoRef}>
                        <option value="0">Any</option>
                        <option value="1">Minimum 1</option>
                        <option value="2">Minimum 2</option>
                        <option value="3">Minimum 3</option>
                        <option value="4">Minimum 4</option>
                        <option value="5">Minimum 5</option>
                    </select>
                </div>
                <div className="form-group col">
                    <label htmlFor="numberOfBathrooms">
                        <i className="fas fa-bath"></i>&nbsp;Bathrooms
                    </label>
                    <select className="form-select" ref={bathroomNoRef}>
                        <option value="0">Any</option>
                        <option value="1">Minimum 1</option>
                        <option value="2">Minimum 2</option>
                        <option value="3">Minimum 3</option>
                    </select>
                </div>
                <div className="form-group col">
                    <label htmlFor="numberOfGardens">
                        <i className="fas fa-tree"></i>&nbsp;Garden
                    </label>
                    <select className="form-select" ref={hasGardenRef}  >
                        <option value="ANY">Any</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </div>
        <div className="text-end">
            <button type="button" className="btn btn-warning" onClick={doReset}>
                <i className="bi bi-arrow-left-circle"></i>&nbsp;Clear
            </button>
            &nbsp;
            <button type="button" className="btn btn-primary" onClick={doSearch}>
                <i className="bi bi-search"></i>&nbsp;Find Properties
            </button>
        </div>
    </form>
    );
};

export default PropertySearch;