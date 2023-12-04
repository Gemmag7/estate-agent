import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddProperty(){

    let navigate = useNavigate();
    const[isChecked , setIsChecked ] = useState(false);

    
    const [property, setProperty] = useState({
        
        "address": "",
        "postcode":"",
        "type": "",
        "price": "",
        "bedroom": "", 
        "bathroom": "", 
        "garden" : "", 
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

    const handleCheck = ()=>{
        
           //TRUE
        if(!isChecked ){
            if(!isChecked ===false){
            console.log("False" ,isChecked)
            setIsChecked(isChecked)
        setProperty({ ...property, garden: 1 });}
    else{
        setProperty({ ...property, garden: 0});
        setIsChecked(!isChecked)
        console.log("TRUE",isChecked)
    }
}

    }


     // {Number(property.garden) ? "Yes" : "No"}
      const handleSubmit =(e) => {
        e.preventDefault();
        fetch(`http://localhost:3004/property`, {

        method:"POST", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      
    }).then(res => res.json())
        .then(res => {
        setProperty({...property, 
            id: property.id,
            address: document.getElementById("address").value, 
            postcode: document.getElementById("postcode").value,
            type: document.getElementById("propertyType").value,
            price:document.getElementById("price").value,
            bedroom: document.getElementById("bedroomNo").value,
            bathroom: document.getElementById("bathroomNo").value,
            garden: document.getElementById("gardenSelect").value,
            status: "FOR SALE"

        })

        console.log(document.getElementById("gardenSelect").value)
        navigate('/viewproperty')
        console.log(":",property)
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
                                        value={property.postcod}
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
                                        placeholder="Enter Number of Bathrooms..."
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
