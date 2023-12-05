import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom"
import './ViewProperty.css';


function ViewProperties(){
   

    const [searchResult, setSearchResult] = useState([]);
    let [properties, setProperties] = useState([])
useEffect(() =>{ generatePropertyList();
}, []);


    
function DeleteProperties(props){

    alert("Are you sure you want to delete?")

   console.log(props)
   console.log(props.id)
   // let {id} = useParams()
     fetch(`http://localhost:3004/property/${props.id}`, {
      
        method:"DELETE", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: props.id}),
       
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
        
        <div className="pageHeader"><i className="bi bi-house-fill"/>&nbsp;Property Search and Bookings</div>
       {/**  <PropertySearch searchHandler={searchHandler}/>*/}
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
                <th><i className="fas fa-bed"/>Bedroom</th>
                <th><i className="fas fa-shower"/>Bathroom </th>
                <th><i className="fas fa-tree"/>Garden </th>
                <th>Status </th>
                <th>Operations</th>
            </tr>
           
            {
                properties.map( (X) =>(
                <tr key={X.id}>
                    <td>{X.address}</td>
                    <td>{X.postcode}</td>
                    <td>{X.type}</td>
                    <td>£{X.price}</td>
                    <td>{X.bedroom}</td>
                    <td>{X.bathroom}</td>
                    
                    <td><span>{Number(X.garden) ? "Yes" : "No"}</span></td>
                    <td>{X.status}</td>
                    <td><input 
                    type='button'
                    id='deleteBtn' 
                    value="Delete" 
                    onClick={() => DeleteProperties(X)}/>
                    <Link className='editLink' state={{properties: X}} to={`/property/${X.id}/edit`}>Update </Link>
                    {X.status === "FOR SALE" && (
                                        <Link className='withdrawLink' to={`/property/${X.id}/withdraw`}>Withdraw</Link>
                    )}
                    </td>
                  
                </tr>
               
  
               ))}
            </tbody>
        </table>
        </div>
       
       
        </>
    );
}

export default ViewProperties;