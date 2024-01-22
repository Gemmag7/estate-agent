import React, {useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty(){

    let navigate = useNavigate();
   
    
    const [propertyDTO, setProperty] = useState({
        
        "address": "",
        "postcode":"",
        "type": "",
        "numberOfBedrooms": 0, 
        "numberOfBathrooms": 0, 
        "garden" : false, 
        "price": 0,
        "status" : "FOR SALE",
        "sellerId":0,
        "buyerId": null
      })

      /**
       * is in charge of when the garden select option is picked
       * @param {*} e used to find the selected value
       */
      const handleSelectChange = (e) => {
        const { value } = e.target;
        setProperty({ ...propertyDTO, garden: value });
    };

    /**
     * 
     * @param {} e Handles the form submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setProperty({...propertyDTO, sellerId: document.getElementById("sellerId").value})
        fetch(`https://localhost:7091/Seller/${propertyDTO.sellerId}`)
      .then((res) => {
        if (res.ok) {
          return fetch(`https://localhost:7091/Property`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(propertyDTO),
          });
        } else {
          alert("Cannot add property: Seller ID not found");
        }
      })
      .then((res) => res.json())
      .then((res) => {
        console.log("RES: " + res);
        navigate('/');
      })
      .catch((error) => {
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
                                        value={propertyDTO.address}
                                        name="address"
                                        onChange={e => setProperty({...propertyDTO, address:e.target.value})}
                                        className="form-control"
                                        placeholder="Enter Address..."
                                        />
                        
                    </div>
                    <div>
                    Postcode:<input
                                        type="text"
                                        id="postcode"
                                        value={propertyDTO.postcode}
                                        name="postcode"
                                        className="form-control"
                                        onChange={e => setProperty({...propertyDTO, postcode:e.target.value})}
                                        placeholder="Enter Postcode..."
                                        />
                    </div>
                    <div>
                    Type:<input
                                        type="text"
                                        id="type"
                                        name="type"
                                        value={propertyDTO.type}
                                        className="form-control"
                                        onChange={e => setProperty({...propertyDTO, type:e.target.value})}
                                        placeholder="Enter Property Type..."
                                        />
                    </div>
                    <div>
                    Price:<input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={propertyDTO.price}
                                        className="form-control"
                                        onChange={e => setProperty({...propertyDTO, price:e.target.value})}
                                        placeholder="Enter Price..."
                                        />
                    </div>
                    <div>
                    Bedroom:<input
                                        type="number"
                                        id="numberOfBedrooms"
                                        name="numberOfBedrooms"
                                        value={propertyDTO.numberOfBedrooms}
                                        className="form-control"
                                        onChange={e => setProperty({...propertyDTO, numberOfBedrooms:e.target.value})}
                                        placeholder="Enter Number of Bedrooms..."
                                        />
                    </div>
                    <div>
                    Bathrooms:<input
                                        type="number"
                                        id="numberOfBathrooms"
                                        name="numberOfBathrooms"
                                        value={propertyDTO.numberOfBathrooms}
                                        className="form-control"
                                        onChange={e => setProperty({...propertyDTO, numberOfBathrooms:e.target.value})}
                                        
                                        />
                    </div>
                    <div>
                    Seller Id:<input
                                        type="number"
                                        id="sellerId"
                                        name="sellerId"
                                        value={propertyDTO.sellerId}
                                        className="form-control"
                                        onChange={e => setProperty({...propertyDTO, sellerId:e.target.value})}
                                        
                                        />
                    </div>
                    
                    <div>
                    Garden:  <select
                            id="gardenSelect"
                            className="form-control"
                            onChange={handleSelectChange}
                            value={propertyDTO.garden}
                        >
                    <option disabled>Any</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
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
