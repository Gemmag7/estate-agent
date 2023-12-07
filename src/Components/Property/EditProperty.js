import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditProperty() {
    //Acessing the ID parameter from the URL
    const { id } = useParams();
    //Accessing the current location
    const location = useLocation();
    //Accessing the navigation function to redirect
    const navigate = useNavigate();

    //State storage that holds all property details
    const [values, setValues] = useState({
        id: "",
        address: "",
        postcode: "",
        type: "",
        price: "",
        bedroom: "",
        bathroom: "",
        garden: "",
        sellerId: "",
        status: "",
    });

    useEffect(() => {
        //Checks if property data is available in the location state
        if (location.state && location.state.property) {
            //Extracts the property data from the location state
            const propertyData = location.state.property;
            //Setting the property data in state
            setValues({
                id: id,
                address: propertyData.address,
                postcode: propertyData.postcode,
                type: propertyData.type,
                price: propertyData.price,
                bedroom: propertyData.bedroom,
                bathroom: propertyData.bathroom,
                garden: propertyData.garden,
                sellerId: propertyData.sellerId,
                status: propertyData.status,
            });
        } else {
            // Fetch property details using the ID if necessary
            fetch(`http://localhost:3004/property/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    //Set the fetched property data in the state
                    setValues(data);
                })
                .catch((err) => console.log(err));
        }
        //Dependancy array to track changes in Id or location state
    }, [id, location.state]);

    //Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    //Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        //Fetch call to the API to edit the data belonging to the selected property with Id  
        fetch(`http://localhost:3004/property/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((res) => {
                //Navigates to the /viewproperty page after user has sucessfully edited a property
                navigate('/');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="d-flex w-100 vh-50 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
            <h2>Edit Property Details:</h2>
            {/*Form for editing property details */}
            <form onSubmit={handleSubmit}>
            <div>
                    Address:<input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={values.address}
                                        className="form-control"
                                        onChange={e => setValues({...values, address:e.target.value})}
                                        
                                        />
                    </div>
                <div>
                    Postcode:<input
                                        type="text"
                                        id="postcode"
                                        name="postcode"
                                        value={values.postcode}
                                        className="form-control"
                                        onChange={e => setValues({...values, postcode:e.target.value})}
                                        
                                        />
                    </div>
                    <div>
                    Type:<input
                                        type="text"
                                        id="type"
                                        name="address"
                                        value={values.type}
                                        className="form-control"
                                        onChange={e => setValues({...values, type:e.target.value})}
                                        
                                        />
                    </div>
                    <div>
                    Price:<input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={values.price}
                                        className="form-control"
                                        onChange={e => setValues({...values, price:e.target.value})}
                                        
                                        />
                    </div>
                    <div>
                    Bedrooms:<input
                                        type="text"
                                        id="bedroomNo"
                                        name="bedroomNo"
                                        value={values.bedroom}
                                        className="form-control"
                                        onChange={e => setValues({...values, bedroom:e.target.value})}
                                        
                                        />
                    </div>
                    <div>
                    Bathrooms:<input
                                        type="text"
                                        id="bathroomNo"
                                        name="batroomNo"
                                        value={values.bathroom}
                                        className="form-control"
                                        onChange={e => setValues({...values, bathroom:e.target.value})}
                                       
                                        />
                    </div>
                <div>
                    Garden: <select
                            id="gardenSelect"
                            className="form-control"
                            onChange={handleChange}
                            value={values.garden}
                            name="gardenSelect"
                        >
                    <option disabled>Any</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
                </div>
                <div>
                    Status:
                    <select
                    
                        id="statusSelect"
                        className="form-control"
                        onChange={handleChange}
                        value={values.status}
                        name="gardenSelect"
                    >
                        <option disabled>Any</option>
                        <option value="FOR SALE">For Sale</option>
                        <option value="SOLD">Sold</option>
                    </select>
                </div>
                <br />
                <br />
                <button id="mainBtn"  style={{marginRight: "2px"}}className="btn btn-info" >Update</button>
                <button id="cancelBtn"  className="btn btn-info" style={{backgroundColor: "gray"}} onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
        </div>
    );
}

export default EditProperty;