import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './EditSeller.css'
function EditSeller(props){

    let navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();
    const [values, setValues] = useState({
        "id": id,
        "firstName": props.firstName,
        "surname":props.surname,
        "address": props.address,
        "postcode": props.postcode,
        "phone": props.phone
      })
    useEffect(()=> {
        fetch(`http://localhost:3000/seller/${id}`)
        .then(res => {
        setValues({...values, 
            "firstName": location.state.sellers.firstName,
            "surname": location.state.sellers.surname,
            "address": location.state.sellers.address,
            "postcode": location.state.sellers.postcode,
            "phone": location.state.sellers.phone,
        })
    }).catch(err => console.log(err))
        
     
    }, [])

    const handleSubmit =(e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/seller/${id}`, {
       
        method:"PUT", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      
    }).then(res => res.json())
        .then(res => {
        setValues({...values, 
            id: id,
            firstName: document.getElementById("firstName").value, 
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
        <div className="d-flex w-100 vh-50 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
                <form onSubmit={handleSubmit} >
                    <div>
                        
                        First Name:<input
                                        type="text"
                                        id="firstName"
                                        value={values.firstName}
                                        name="name"
                                        onChange={e => setValues({...values, firstName:e.target.value})}
                                        className="form-control"
                                        placeholder="Enter First Name..."
                                        />
                        
                    </div>
                    <div>
                    Surname:<input
                                        type="text"
                                        id="surname"
                                        value={values.surname}
                                        name="surname"
                                        className="form-control"
                                        onChange={e => setValues({...values, surname:e.target.value})}
                                        placeholder="Enter Surame..."
                                        />
                    </div>
                    <div>
                    Address:<input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={values.address}
                                        className="form-control"
                                        onChange={e => setValues({...values, address:e.target.value})}
                                        placeholder="Enter Address..."
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
                                        placeholder="Enter Postcode..."
                                        />
                    </div>
                    <div>
                    Phone Numer:<input
                                        type="text"
                                        id="phoneNo"
                                        name="phoneNo"
                                        value={values.phone}
                                        className="form-control"
                                        onChange={e => setValues({...values, phone:e.target.value})}
                                        placeholder="Enter Phone Number..."
                                        />
                    </div>
                    <br/>
                    <br/>
                    <button id="mainBtn"  className="btn btn-info" >Update</button>
                </form>
                </div> 

        </div>

    )
}

export default EditSeller;