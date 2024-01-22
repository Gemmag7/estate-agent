import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Seller/Seller.css'

function ViewBuyers(){

    let [buyers, setBuyers] = useState([])
useEffect(() =>{ generateBuyerList();
}, []);
    
function DeleteBuyer(X){

   // let {id} = useParams()
   
   const confirmed = window.confirm("Are you sure you want to delete?")
   if (confirmed) {
     fetch(`https://localhost:7091/Buyer/${X.id}`, {
      
        method:"DELETE", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: X.id}),
       
    }).then((res) => res.json());
    
    generateBuyerList()
};
};

function EditBuyer(X){
    let editBtn = document.getElementById("editBtn")
    if (editBtn.value=="Edit"){
        //editBtn.value=="Save";
        //editRecords(X)
    }
    // let {id} = useParams()
      fetch(`https://localhost:7091/Buyer/${X.id}`, {
       
         method:"DELETE", 
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({id: X.id}),
        
     }).then((res) => res.json());
     generateBuyerList()
 }

function generateBuyerList()
{
    fetch('https://localhost:7091/Buyer')
    .then((response)=>response.json())
    .then((data)=>{
        setBuyers(data)});
}

    return(
        <div className='container'>
        <h2>Buyerss</h2>
        <br/>
        <br/>
        <Link className='addLink' state={{buyers}} to={`/Buyer/add`}>Create +</Link>
        <table>
            <tbody>
            <tr style={{ backgroundColor: '#FFC0CB', color: '#fff' }}>
                <th>UserID </th>
                <th>First Name</th>
                <th>Surname</th>
                <th>Address</th>
                <th>Postcode</th>
                <th>Phone No.</th>
                <th>Operations </th>
            </tr>
           
            {
                buyers.map( (X) =>
                <tr>
                    <td>{X.id}</td>
                    <td>{X.firstName}</td>
                    <td>{X.surname}</td>
                    <td>{X.address}</td>
                    <td>{X.postcode}</td>
                    <td>{X.phone}</td>
                    <td><input type="button" id='deleteBtn' value="Delete"onClick={() => DeleteBuyer(X)}></input>
                    <Link className='editLink' state={{buyers: X}} to={`/Buyer/${X.id}/edit`}>Update</Link>
                    
                    </td>
                  
                </tr>
               
  ) 
            }
            </tbody>
        </table>
        
        </div>
    )
}

export default ViewBuyers;