import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditProperty(props) {
    //Acessing the ID parameter from the URL
    const { id } = useParams();
    //Accessing the current location
    const location = useLocation();
    //Accessing the navigation function to redirect
    const navigate = useNavigate();

    //State storage that holds all property details
    const [values, setValues] = useState({
        "id": id,
        "address": props.address,
        "postcode": props.postcode,
        "type": props.type,
        "price": props.price,
        "bedroom": props.numberOfBedrooms,
        "bathroom": props.numberOfBathrooms,
        "garden": props.garden,
        "sellerId": props.sellerId,
        "status": props.status, 
        "buyerId" : props.buyerId
    });

    useEffect(()=> {
        fetch(`https://localhost:7091/Property/${id}`)
        .then(res => {
        setValues({...values, 
            "address": location.state.properties.address,
            "postcode": location.state.properties.postcode,
            "type": location.state.properties.type,
            "price": location.state.properties.price,
            "numberOfBedrooms": location.state.properties.numberOfBedrooms,
            "numberOfBathrooms": location.state.properties.numberOfBathrooms,
            "garden": location.state.properties.garden,
            "sellerId": location.state.properties.sellerId,
            "status": location.state.properties.status,
            "buyerId": location.state.properties.buyerId
        })
    }).catch(err => console.log(err))
        
     
    }, [])

    //Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    //Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        //Fetch call to the API to edit the data belonging to the selected property with Id  https://localhost:7091/Property/12
        fetch(`https://localhost:7091/Property/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values), 
        }).then(res => res.json())
            .then(res => {
                setValues({
                    ...values,
                    "address": res.address,
                    "postcode": res.postcode,
                    "type": res.type,
                    "price": res.price,
                    "numberOfBedrooms": res.numberOfBedrooms,
                    "numberOfBathrooms": res.numberOfBathrooms,
                    "garden": res.garden,
                    "sellerId": res.sellerId,
                    "status": res.status,
                    "buyerId": res.buyerId
                 });
                 navigate("/")
            })
            .catch((error) => {
                console.error("Error:", error);
            }, [id, values]);
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
                                        name="type"
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
                                        id="numberOfBedrooms"
                                        name="numberOfBedrooms"
                                        value={values.numberOfBedrooms}
                                        className="form-control"
                                        onChange={e => setValues({...values, numberOfBedrooms:e.target.value})}
                                        
                                        />
                    </div>
                    <div>
                    Bathrooms:<input
                                        type="text"
                                        id="numberOfBathrooms"
                                        name="numberOfBathrooms"
                                        value={values.numberOfBathrooms}
                                        className="form-control"
                                        onChange={e => setValues({...values, numberOfBathrooms:e.target.value})}
                                       
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
                        name="statusSelect"
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