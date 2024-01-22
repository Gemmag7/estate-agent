import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

function WithdrawProperty(props) {
    const { id } = useParams();
   // const location = useLocation();
    const navigate = useNavigate();

    // Initial state based on props
    const [values, setValues] = useState({
        id: props.id || "",
        address: props.address || "",
        postcode: props.postcode || "",
        type: props.type || "",
        price: props.price || "",
        bedroom: props.bedroom || "",
        bathroom: props.bathroom || "",
        garden: props.garden || "",
        sellerId: props.sellerId || "",
        status: props.status || "",
    });

    useEffect(() => {
        if (!props.id) {
            // Fetch data only if props are not available
            fetch(`https://localhost:7091/property/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setValues(data);
                })
                .catch((err) => console.log(err));
        }
    }, [id, props.id]);

    const handleStatusChange = (e) => {
        setValues({ ...values, status: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://localhost:7091/property/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((res) => {
                setValues({ ...values, status: "WITHDRAWN" });
                navigate('/');
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
                        <option aria-disabled={false}>Withdraw Property...</option>
                        
                        <option value="WITHDRAWN">Withdrawn</option>
                        
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