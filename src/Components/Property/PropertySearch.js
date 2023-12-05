import React, { useState } from "react";
import "./PropertySearch.css";

const PropertySearch = (props) => {
    const [type, setType] = useState("ANY");
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [garden, setGarden] = useState(0);
    const [price, setPrice] = useState(0);

    const searchHandler = props.searchHandler;
    ///const searchResult = props.searchResult;

    const doSearch = () => {
        searchHandler({
            type,
            bedroom: bedrooms,
            bathroom: bathrooms,
            garden,
            price,
        });
    };

    const doReset = () => {
        setType("ANY");
        setBedrooms(0);
        setBathrooms(0);
        setGarden(0);
        setPrice(0);
        doSearch();
    };

    return (
        <form>
            
            <div className="row">
                <div className="form-group col">
                    <label htmlFor="propertyType">
                        <i className="fas fa-home"></i>&nbsp;Type
                    </label>
                    <select
                        className="form-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
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
                        className="form-select"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >
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
                    <select
                        className="form-select"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                    >
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
                    <select
                        className="form-select"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                    >
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
                    <select
                        className="form-select"
                        value={garden}
                        onChange={(e) => setGarden(e.target.value)}
                    >
                        <option value="0">Any</option>
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