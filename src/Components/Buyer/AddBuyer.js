import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBuyer(){

    let navigate = useNavigate();
    const [buyer, setBuyer] = useState({
        
        "firstName": "",
        "surname":"",
        "address": "",
        "postcode": "",
        "phone": ""
      })//le.log(":(:",buyer)
      const handleSubmit =(e) => {
        e.preventDefault();
        fetch(`https://localhost:7091/Buyer`, {
       
        method:"POST", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(buyer),
      
    }).then(res => res.json())
        .then(res => {
        setBuyer({...buyer, 
            id: buyer.id,
            firstName: document.getElementById("firstName").value, 
            surname: document.getElementById("surname").value,
            address: document.getElementById("address").value,
            postcode:document.getElementById("postcode").value,
            phone: document.getElementById("phone").value,
        })
        navigate('/Buyer')
        console.log(":",buyer)
    });
    
}


    return(
        <div className="d-flex vw-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
                <form onSubmit={handleSubmit} >
                    <div>
                        
                        First Name:<input
                                        type="text"
                                        id="firstName"
                                        value={buyer.firstName}
                                        name="name"
                                        onChange={e => setBuyer({...buyer, firstName:e.target.value})}
                                        className="form-control"
                                        placeholder="Enter First Name..."
                                        />
                        
                    </div>
                    <div>
                    Surname:<input
                                        type="text"
                                        id="surname"
                                        value={buyer.surname}
                                        name="surname"
                                        className="form-control"
                                        onChange={e => setBuyer({...buyer, surname:e.target.value})}
                                        placeholder="Enter Surname..."
                                        />
                    </div>
                    <div>
                    Address:<input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={buyer.address}
                                        className="form-control"
                                        onChange={e => setBuyer({...buyer, address:e.target.value})}
                                        placeholder="Enter Address..."
                                        />
                    </div>
                    <div>
                    Postcode:<input
                                        type="text"
                                        id="postcode"
                                        name="postcode"
                                        value={buyer.postcode}
                                        className="form-control"
                                        onChange={e => setBuyer({...buyer, postcode:e.target.value})}
                                        placeholder="Enter Postcode..."
                                        />
                    </div>
                    <div>
                    Phone Numer:<input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={buyer.phone}
                                        className="form-control"
                                        onChange={e => setBuyer({...buyer, phone:e.target.value})}
                                        placeholder="Enter Phone Number..."
                                        />
                    </div>
                    <br/>
                    <br/>
                    <button id="mainBtn"  className="btn btn-info" >Add</button>
                </form>
                </div> 

        </div>


    )
}  

export default AddBuyer;