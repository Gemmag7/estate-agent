import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function WithdrawProperty(props){

    let navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();
    const [values, setValues] = useState({
        "id": id,
        "address": props.address,
        "postcode": props.postcode,
        "type": props.address,
        
        "phone": props.phone
      })
    useEffect(()=> {
        fetch(`http://localhost:3004/property/${id}`)
        .then(res => {
        setValues({...values, 
            "address": location.state.property.address,
            "surname": location.state.sellers.surname,
            
            "postcode": location.state.sellers.postcode,
            "phone": location.state.sellers.phone,
        })
    }).catch(err => console.log(err))
        
     
    }, [])

    const handleSubmit =(e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/property/${id}`, {
       
        method:"PUT", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      
    }).then(res => res.json())
        .then(res => {
        setValues({...values, 
            id: id,
            firstName: document.getElementById("address").value, 
            surname: document.getElementById("surname").value,
            address: document.getElementById("address").value,
            postcode:document.getElementById("postcode").value,
            phone: document.getElementById("phoneNo").value,
        })
        navigate('/seller')
        console.log(":",values)
    });

   
    }
    return(
        <div >
        <h2>Add a property:</h2>
        <div >
            <form onSubmit={handleSubmit} >
                <div>
                    
                    Address:<input
                                    type="text"
                                    id="address"
                                    value={property.address}
                                    name="name"
                                    onChange={e => setProperty({...property, address:e.target.value})}
                                    className="form-control"
                                    placeholder="Enter Address..."
                                    />
                    
                </div>
                <div>
                Postcode:<input
                                    type="text"
                                    id="postcode"
                                    value={property.postcode}
                                    name="postcode"
                                    className="form-control"
                                    onChange={e => setProperty({...property, postcode:e.target.value})}
                                    placeholder="Enter Postcode..."
                                    />
                </div>
                <div>
                Type:<input
                                    type="text"
                                    id="propertyType"
                                    name="address"
                                    value={property.type}
                                    className="form-control"
                                    onChange={e => setProperty({...property, type:e.target.value})}
                                    placeholder="Enter Property Type..."
                                    />
                </div>
                <div>
                Price:<input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={property.price}
                                    className="form-control"
                                    onChange={e => setProperty({...property, price:e.target.value})}
                                    placeholder="Enter Price..."
                                    />
                </div>
                <div>
                Bedroom:<input
                                    type="number"
                                    id="bedroomNo"
                                    name="bedroomNo"
                                    value={property.bedroom}
                                    className="form-control"
                                    onChange={e => setProperty({...property, bedroom:e.target.value})}
                                    placeholder="Enter Number of Bedrooms..."
                                    />
                </div>
                <div>
                Bathrooms:<input
                                    type="number"
                                    id="bathroomNo"
                                    name="bathroomNo"
                                    value={property.bathroom}
                                    className="form-control"
                                    onChange={e => setProperty({...property, bathroom:e.target.value})}
                                    
                                    />
                </div>
                <div>
                Seller Id:<input
                                    type="number"
                                    id="sellerId"
                                    name="sellerId"
                                    value={property.sellerId}
                                    className="form-control"
                                    onChange={e => setProperty({...property, sellerId:e.target.value})}
                                    
                                    />
                </div>
                
                <div>
                Garden:  <select
                        id="statusSelect"
                        className="form-select"
                        onChange={handleSelectChange}
                        value={property.garden}
                    >
                <option disabled>Any</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
            </div>
                <br/>
                <br/>
                <button id="mainBtn"  className="btn btn-info" >Add</button>
            </form>
            </div> 

    </div>


    )
}

export default WithdrawProperty;