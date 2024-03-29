import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSeller(){

   const [sellersDB, setSellersDB] = useState([]);
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
   
    "firstName": "",
    "surname": "",
    "address": "",
    "postcode": "",
    "phone": ""
  });

 useEffect(() => {
    generateSellerList();
  }, []);

  function generateSellerList() {
   fetch('https://localhost:7091/Seller')
      .then((response) => response.json())
      .then((data) => {
        setSellersDB(data);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSeller = {
      firstName: seller.firstName.trim(),
      surname: seller.surname.trim()
    };

    const sellerExists = sellersDB.some(
      (s) =>
        s.firstName.toLowerCase() === newSeller.firstName.toLowerCase() &&
        s.surname.toLowerCase() === newSeller.surname.toLowerCase()
    );

    if (sellerExists) {
      alert("Seller with this first name or surname already exists.");
      alert("!")
    } else {
      // If seller doesn't exist, proceed to create the seller
      fetch(`https://localhost:7091/Seller`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seller),
      })
        .then(res => res.json())
        .then(res => {
          setSeller({...seller,
            id: res.id,
            firstName: document.getElementById("firstName").value, 
            surname: document.getElementById("surname").value,
            address: document.getElementById("address").value,
            postcode:document.getElementById("postcode").value,
            phone: document.getElementById("phone").value,
          });
          console.log("New seller created:", seller);
          navigate('/Seller');
          console.log("New seller created:", res);
        })
        .catch(error => {
          console.error("Error creating seller:", error);
          // Handle error scenario here
        });
    }
  };
        

    return(
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
                <form onSubmit={handleSubmit} >
                  <h1 style={{color:""}}>Add a Seller:</h1>
                    <div>
                        
                        First Name:<input
                                        type="text"
                                        id="firstName"
                                        value={seller.firstName}
                                        name="name"
                                        onChange={e => setSeller({...seller, firstName:e.target.value})}
                                        className="form-control"
                                        placeholder="Enter First Name..."
                                        />
                        
                    </div>
                    <div>
                    Surname:<input
                                        type="text"
                                        id="surname"
                                        value={seller.surname}
                                        name="surname"
                                        className="form-control"
                                        onChange={e => setSeller({...seller, surname:e.target.value})}
                                        placeholder="Enter Surname..."
                                        />
                    </div>
                    <div>
                    Address:<input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={seller.address}
                                        className="form-control"
                                        onChange={e => setSeller({...seller, address:e.target.value})}
                                        placeholder="Enter Address..."
                                        />
                    </div>
                    <div>
                    Postcode:<input
                                        type="text"
                                        id="postcode"
                                        name="postcode"
                                        value={seller.postcode}
                                        className="form-control"
                                        onChange={e => setSeller({...seller, postcode:e.target.value})}
                                        placeholder="Enter Postcode..."
                                        />
                    </div>
                    <div>
                    Phone Numer:<input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={seller.phone}
                                        className="form-control"
                                        onChange={e => setSeller({...seller, phone:e.target.value})}
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

export default AddSeller;
