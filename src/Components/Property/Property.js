import React, {useEffect, useReducer, useState} from "react";
import {Link} from "react-router-dom";
import { Table } from "react-bootstrap";
import "./Property.css";
import PropertySearch from "./PropertySearchForm";

const Property = (props) => {
    const propertyListReducer = (state, action) => {
        switch (action.type) {
            case "SET":
                return action.payload;
            case "REMOVE":
                return state.filter(property => property.id !== action.payload);
            default:
                return state;
        }
    };

    function Gardenvalue(props) {

        if (props.garden == 0) {
            return <td>No</td>
        }
        else{ 
            return <td>Yes</td>
        }
       
    }
    const [properties, dispatch] = useReducer(propertyListReducer, []);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchHandler = (searchCriteria) => {
        setSearchResult(properties.filter(property =>
            (searchCriteria.type === "ANY" || property.type === searchCriteria.type) &&
            (Number(property.bedroom) >= Number(searchCriteria.bedroom)) &&
            (Number(property.bathroom) >= Number(searchCriteria.bathroom)) &&
            (Number(property.garden) >= Number(searchCriteria.garden)) &&
            (searchCriteria.status === "ANY" || property.status === searchCriteria.status) &&
            (Number(searchCriteria.price) === 0 || Number(property.price) <= Number(searchCriteria.price))
        ));
        console.log(searchCriteria);
        console.log(": ", searchResult);
    };

    function handleDeleteProperty(property) {

        const confirmed = window.confirm("Are you sure you want to delete?")
        if (confirmed) {
            fetch(`http://localhost:3004/property/${property.id}`, {
    
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: property.id }),
    
            }).then((res) => res.json());
    
            generateProperties();
        };
    };

    function generateProperties(){
        setLoading(true);
        fetch("http://localhost:3004/property")
        // get the JSON content from the response
        .then((response) => {
            //if response isn't okay and returns a code that is not 200, then an error message will display
            if (!response.ok) {
                alert("An error has occurred.  Unable to load Properties data");
                throw response.status;
            } else return response.json();
        })
        .then(properties => {
            dispatch({type: "SET", payload: properties});
            setSearchResult(properties);
            setLoading(false);
            console.log(JSON.stringify(properties, null, 2));
        })
        .catch(error => {
            setLoading(false);
            console.error(error);
            window.alert("An error has occurred");
        });
    }

    useEffect(() => {
        generateProperties();
    }, []);

    return (
        <>
             <div className="PropForm">
            <PropertySearch searchHandler={searchHandler}/>
            <hr/>

            {
                loading ?
                    <div className="message alert alert-info" role="alert">
                        <span className="spinner-border" role="status"><i className="sr-only"/></span>
                        Loading Properties
                    </div>
                    : ""
            }
            <ul>
                {
                    searchResult.length === 0 && !loading ?
                        <li>
                            <div className="message alert alert-info" role="alert">
                                <i className="bi bi-info-circle"></i>&nbsp;No properties found
                            </div>
                        </li>
                        :
                        <div className="PropertyApp">
                            <Link className='addLink' style={{margin:"4px"}} state={{properties}} to={`/property/add`}>Add a Property</Link>
                        <Table responsive="lg" style={{borderRadius: "14px"}}>
                            <thead>
                                <tr style={{ "backgroundColor": "rgb(255, 192, 203)", "color": "purple"}}>
                                    <th><i class="fa fa-home"></i>&nbsp;Type</th>
                                    <th className="Addclass"><i className="fa fa-home"> </i> &nbsp;Address</th>
                                    <th ><i className="fa fa-money" ></i>&nbsp;Price</th>
                                    <th><i className="fa fa-check-circle" style={{margin: "0 auto", textAlign:"left"}}></i>&nbsp;Status</th>
                                    <th><i className="fa fa-bed" style={{margin: "0 auto", textAlign:"left"}}></i>&nbsp;Bedroom</th>
                                    <th><i className="fa fa-bathtub" style={{margin: "0 auto", textAlign:"left"}}></i>&nbsp;Bathroom</th>
                                    <th><i className="fa fa-tree" style={{margin: "0", textAlign:"left"}} ></i>&nbsp;Garden</th>
                                    <th><i className="fa fa-cogs"></i>&nbsp;Operations</th>
        
        
        
                                </tr>
                            </thead>
                            <tbody id="valuetable">
                                {searchResult.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.type}</td>
                                        <td className="Addclass">{item.address}</td>
                                        <td>£{item.price}</td>
                                        <td>{item.status}</td>
                                        <td>{item.bedroom}</td>
                                        <td>{item.bathroom}</td>
                                        <td><Gardenvalue garden={item.garden} /></td>
                                        <td>
                                            {
                                                <td>
                                                    {item.status === "WITHDRAWN" && (
                                                        <Link className='resubmitLink' style={{ marginTop: "4px" }} state={{ properties: item }} to={`/property/${item.id}/resubmit`}>Resubmit</Link>
        
                                                    )}</td>
                                            }
                                             
                                            <input
                                                style={{ marginRight: "4px" } }
                                                type='button'
                                                id='deleteBtn'
                                                value="Delete"
                                                onClick={() => handleDeleteProperty(item)} />
                                                
                                                
                                            <Link className="editLink" state={{ properties: item }} to={`/property/${item.id}/edit`}>Update</Link>
        
                                            {item.status === "FOR SALE" && (
                                                <Link className='withdrawLink' state={{ properties: item }} to={`/property/${item.id}/withdraw`}>Withdraw</Link>
        
                                            )
                                            }
        
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
}
</ul>
</div>
                    </>
            );
        }
export default Property;