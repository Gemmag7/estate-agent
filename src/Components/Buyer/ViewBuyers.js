import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Seller/Seller.css'

function ViewBuyers(props){

    let [buyers, setBuyers] = useState([])
   
useEffect(() =>{  setBuyers(props);//generateBuyerList();
}, []);
    
function DeleteBuyer(props){

   // let {id} = useParams()
   
   const confirmed = window.confirm("Are you sure you want to delete?")
   if (confirmed) {
     fetch(`http://localhost:3004/buyer/${props}`, {
      
        method:"DELETE", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: props}),
       
    }).then((res) => res.json());
    
    generateBuyerList()
}
};

function EditBuyer(X){
    let editBtn = document.getElementById("editBtn")
    if (editBtn.value=="Edit"){
        //editBtn.value=="Save";
        //editRecords(X)
    }
    // let {id} = useParams()
      fetch(`http://localhost:3004/buyer/${X.id}`, {
       
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
    fetch('http://localhost:3004/buyer')
    .then((response)=>response.json())
    .then((data)=>{
        setBuyers(data)});
}

    return(
        <div className='container'>
        <h2>Buyers</h2>
        <br/>
        <br/>
        <Link className='addLink' state={{buyers}} to={`/buyer/add`}>Create +</Link>
        <table name="buyer-table" data-testid="buyer-table" id="buyer-table">
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
                props.buyers.map( (X) =>
                <tr>
                    <td>{X.id}</td>
                    <td>{X.firstName}</td>
                    <td>{X.surname}</td>
                    <td>{X.address}</td>
                    <td>{X.postcode}</td>
                    <td>{X.phone}</td>
                    <td><input type="button" id='deleteBtn' data-testid="btnDelete" value="Delete"onClick={() => props.DeleteBuyer(X.id)}></input>
                    <Link className='editLink' state={{buyers: X}} to={`/buyer/${X.id}/edit`}>Update</Link>
                    
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