import React, {useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty(){

    let navigate = useNavigate();
   
    
    const [property, setProperty] = useState({
        
        "address": "",
        "postcode":"",
        "type": "",
        "price": "",
        "bedroom": "", 
        "bathroom": "", 
        "garden" : "", 
        "sellerId":"",
        "status" : ""
      })

      /**
       * is in charge of when the garden select option is picked
       * @param {*} e used to find the selected value
       */
      const handleSelectChange = (e) => {
        const { value } = e.target;
        setProperty({ ...property, garden: value });
    };

    /**
     * 
     * @param {} e Handles the form submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setProperty({...property, sellerId: document.getElementById("sellerId").value})
        // Fetch request to check if sellerId exists in the database
        fetch(`http://localhost:3004/seller/${property.sellerId}`)
            .then(res => {
                if (res.ok) {
                    // If sellerId exists, proceed to add the property
                    return fetch(`http://localhost:3004/property`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...property,
                            status: "FOR SALE"
                        }),
                    });
                } else {
                    // If sellerId does not exist, handle the error
                    alert("Cannot add property: Seller ID not found");
                   
                }
            })
            .then(res => res.json())
            .then(res => {
                // Handle the response or navigate to viewproperty
                console.log(res);
                navigate('/');
            })
            .catch(error => {
                // Handle error, show a message, etc.
                console.error(error);
            });
    };
      
    


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
                            id="gardenSelect"
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

export default AddProperty;
