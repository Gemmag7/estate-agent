import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditProperty(props) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

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
        if (location.state && location.state.property) {
            const propertyData = location.state.property;
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
                    setValues(data);
                })
                .catch((err) => console.log(err));
        }
    }, [id, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3004/property/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((res) => {
                navigate('/viewproperty');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h2>Edit Property Details:</h2>
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
                        <option value="FOR SALE">For Sale</option>
                        <option value="WITHDRAWN">Withdrawn</option>
                        <option value="SOLD">Sold</option>
                    </select>
                </div>
                <br />
                <br />
                <button id="mainBtn"  className="btn btn-info" >Update</button>
            </form>
        </div>
    );
}

export default EditProperty;