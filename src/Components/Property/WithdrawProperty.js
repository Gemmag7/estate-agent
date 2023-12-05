import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function WithdrawProperty(props) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

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

    console.log(values)
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
                    status: "WITHDRAWN" });
                navigate('/viewproperty');
                console.log("Updated status:", values.status);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h2>Withdraw a property:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Address:
                    <input
                        type="text"
                        value={values.address}
                        readOnly={true}
                        className="form-control"
                    />
                </div>
                <div>
                    postcode:
                    <input
                        type="text"
                        value={values.postcode}
                        readOnly={true}
                        className="form-control"
                    />
                </div>
                <div>
                    Type:
                    <input
                        type="text"
                        value={values.type}
                        readOnly={true}
                        className="form-control"
                    />
                </div>
                <div>
                    Price:
                    <input
                        type="text"
                        value={values.price}
                        readOnly={true}
                        className="form-control"
                    />
                </div>
                <div>
                    Bedrooms:
                    <input
                        type="text"
                        value={values.bedroom}
                        readOnly={true}
                        className="form-control"
                    />
                </div>
                <div>
                    Bathrooms:
                    <input
                        type="text"
                        value={values.bathroom}
                        readOnly={true}
                        className="form-control"
                    />
                </div>
                <div>
                    Garden:
                    <input
                        type="text"
                        value={Number(values.garden) ? "Yes" : "No"}
                        readOnly={true}
                        className="form-control"
                    />
                </div>
                <div>
                    sellerId:
                    <input
                        type="text"
                        value={values.sellerId}
                        readOnly={true}
                        className="form-control"
                    />
                </div>
                <div>
                    Status:
                    <select
                        id="statusSelect"
                        className="form-control"
                        onChange={handleStatusChange}
                        value={values.status}
                    >
                        <option value="FOR SALE">For Sale</option>
                        <option value="WITHDRAWN">Withdrawn</option>
                        <option value="SOLD">Sold</option>
                    </select>
                </div>
                <br />
                <br />
                <button id="mainBtn" className="btn btn-info">Add</button>
            </form>
        </div>
    );
}

export default WithdrawProperty;