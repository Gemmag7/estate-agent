import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom"
import './ViewProperty.css';
import PropertySearch from './PropertySearch';


function ViewProperties(){
   

    
    const [searchResult, setSearchResult] = useState([]);
    let [properties, setProperties] = useState([])
useEffect(() =>{ generatePropertyList();
}, []);


    
function DeleteProperties(props){

    const confirmed = window.confirm("Are you sure you want to delete?")
     if (confirmed){
    fetch(`http://localhost:3004/property/${props.id}`, {
      
        method:"DELETE", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: props.id}),
       
    }).then((res) => res.json());
    
    generatePropertyList()
}
};
const searchHandler = (searchCriteria) => {
    const filteredProperties = properties.filter(property =>
        (searchCriteria.type === "ANY" || property.type === searchCriteria.type) &&
        (Number(property.bedroom) >= Number(searchCriteria.bedroom)) &&
        (Number(property.bathroom) >= Number(searchCriteria.bathroom)) &&
        (Number(property.garden) >= Number(searchCriteria.garden)) &&
        (Number(searchCriteria.price) === 0 || Number(property.price) <= Number(searchCriteria.price))
    );
    setSearchResult(filteredProperties);
    console.log(filteredProperties)
    console.log(searchResult)
};

function generatePropertyList()
{
    fetch('http://localhost:3004/property')
    .then((res)=>res.json())
    .then((data)=>{
        setProperties(data)});
}

    return(
        <>
        
        <div className="pageHeader"><i className="bi bi-house-fill"/>&nbsp;Property Search and Bookings</div>
         <PropertySearch searchHandler={searchHandler}/>
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
           
            {searchResult.length > 0 && (
                <div className="search-result">
                    <h3>Search Results:</h3>
                    
                        {searchResult.map((result, index) => (
                            <tr key={index}>
               
              
                    <td>{result.address}</td>
                    <td>{result.postcode}</td>
                    <td>{result.type}</td>
                    <td>£{result.price}</td>
                    <td>{result.bedroom}</td>
                    <td>{result.bathroom}</td>
                    
                    <td><span>{Number(result.garden) ? "Yes" : "No"}</span></td>
                    <td>{result.status}</td>
                    <td>
                       {result.status ==="WITHDRAWN" &&(
                                        <Link className='withdrawLink' state={{properties:result}} to={`/property/${result.id}/withdraw`}>Withdraw</Link>
                                    
                    )
                    }
                        <input 
                    type='button'
                    id='deleteBtn' 
                    value="Delete" 
                    onClick={() => DeleteProperties(result)}/>
                    <Link className="editLink" state={{properties: result}} to={`/property/${result.id}/edit`}>Update </Link>
                   
                    {result.status === "FOR SALE" && (
                                        <Link className='withdrawLink' state={{properties:result}} to={`/property/${result.id}/withdraw`}>Withdraw</Link>
                                    
                    )
                    }

                   
                    </td>
                  
                </tr>
               
  
               ))}
               </div>
            )}
            </tbody>
        </table>
        </div>
       
       
        </>
    );
}

export default ViewProperties;