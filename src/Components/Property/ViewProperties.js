import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom"
import './ViewProperty.css';

function ViewProperties(){

    let [properties, setProperties] = useState([])
useEffect(() =>{ generatePropertyList();
}, []);
    
function DeleteProperties(X){

   // let {id} = useParams()
     fetch(`http://localhost:3004/property/${X.id}`, {
      
        method:"DELETE", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: X.id}),
       
    }).then((res) => res.json());
    
    generatePropertyList()
}

function EditSeller(X){
    let editBtn = document.getElementById("editBtn")
    if (editBtn.value=="Edit"){
        //editBtn.value=="Save";
        //editRecords(X)
    }
    // let {id} = useParams()
      fetch(`http://localhost:3004/property/${X.id}`, {
       
         method:"DELETE", 
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({id: X.id}),
        
     }).then((res) => res.json());
     generatePropertyList()
 }

function generatePropertyList()
{
    fetch('http://localhost:3004/property')
    .then((response)=>response.json())
    .then((data)=>{
        setProperties(data)});
}

    return(
        <>
        
        <div className='container'>
            <div className='heading'>
        <h2>Properties</h2>
        <br/>
        <br/>
        <Link className='addLink' state={{properties}} to={`/property/add`}>Add a Property</Link>
        </div>
        
        <div className='table-container'>
        <table >
        
            <tbody>
            <tr>
                
                <th>Address </th>
                <th>Postcode </th>
                <th>Type</th>
                <th>Price</th>
                <th>Bedroom</th>
                <th>Bathroom </th>
                <th>Garden </th>
                <th>Status </th>
                <th>Operations</th>
            </tr>
           
            {
                properties.map( (X) =>
                <tr key={X.id}>
                    <td>{X.address}</td>
                    <td>{X.postcode}</td>
                    <td>{X.type}</td>
                    <td> £{X.price}</td>
                    <td>{X.bedroom}</td>
                    <td>{X.bathroom}</td>
                    
                    <td><i className="fas fa-tree"/><span>{Number(X.garden) ? "Yes" : "No"}</span></td>
                    <td>{X.status}</td>
                    <td><Link className='deleteLink' state={{properties: X}} to={`/property/${X.id}/delete`}>Delete </Link>
                    <Link className='editLink' state={{properties: X}} to={`/property/${X.id}/edit`}>Update </Link>
                    
                    </td>
                  
                </tr>
               
  ) 
            }
            </tbody>
        </table>
        </div>
        </div>
       
        </>
    )
}

export default ViewProperties;