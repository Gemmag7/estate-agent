import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditProperty(props) {

    const { id } = useParams();
    const location = useLocation();
    let navigate = useNavigate();
console.log("PROPS: ",props.price)

    const [values, setValues] = useState({
        id: id,
        address: props.address,
        postcode: props.postcode,
        type: props.type,
        price: props.price,
        bedroom: props.bedroom,
        bathroom: props.bathroom,
        garden: props.garden,
        sellerId: props.sellerId,
        status: props.status,
    });

    console.log("VALUES",values)
    useEffect(() => {
        fetch(`http://localhost:3004/property/${id}`)
        .then(res => {
            setValues({
                id: location.state.property.id,
                address: location.state.property.address,
                postcode: location.state.property.postcode,
                type: location.state.property.type,
                price: location.state.property.price,
                bedroom: location.state.property.bedroom,
                bathroom: location.state.property.bathroom,
                garden: location.state.property.garden,
                sellerId: location.state.property.sellerId,
                status: location.state.property.status
            })
        }).catch( err => console.log(err))
            
           
    }, []);

        /**
       * is in charge of when the garden select option is picked
       * @param {*} e used to find the selected value
       */
        const handleSelectChange = (e) => {
           
            setValues({ ...values, garden: e.target.value });
        };
    const handleStatusChange = (e) => {
        setValues({ ...values, status: e.target.value });
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
                setValues({ ...values, 
                    id: id,
                    address: values.address, 
                    postcode: values.postcode, 
                    type: values.type, 
                    price: values.price, 
                    bedroom: values.bedroom, 
                    bathroom: values.bathroom, 
                    garden: values.garden, 
                    sellerId: values.sellerId,
                    status: values.status 
                });
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
                            onChange={handleSelectChange}
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
                        onChange={handleStatusChange}
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