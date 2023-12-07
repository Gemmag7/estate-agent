import PropertySearch from "./PropertySearch";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import "./ViewProperty.css"
import { IconBase } from "react-icons";

function ViewProperties() {
    function Gardenvalue(props) {

        if (props.garden == 0) {
            return <td>No</td>
        }
        else{ 
            return <td>Yes</td>
        }
       
    }
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

        
    function GardenValueArray(props) {
       // console.log(" The incoming value is "+props)
        switch(props)
        {
        case 0:
            return "No"
        break;
        case 1:
            return "Yes"
        break;
        default:
            return "Yes"
        }
    }
    
    
    
    function generateProperties(){
        fetch("http://localhost:3004/property")
                .then((res) => res.json())
                .then((data) => setData(data))
                .catch((err) => console.log(err));
    }
    // Declare a new state variable, which we'll call "searchvalue" the state of search value it recieved 
    //from the form then when we will use it to filter the item
    let searchvalue = useState({})
    const searchHandler = (search) => {
        searchvalue=search;
     if (Number(search.bedroom) !=0|| Number(search.bathroom) != 0) {
            // getting the table id for manipulation then running the custom search method with the table builder
            const table = document.getElementById('valuetable')
            while (table.hasChildNodes()) {
                table.removeChild(table.lastChild);
            }
            tablebuilderwithsearch(searchvalue);
        }
    };
    // Fetch method to get data from the json and then display it as data
    const [data, setData] = useState([]);
    useEffect(() => {
        generateProperties();
    }, []);

    // Builds the tables based on the search entries.
    function tablebuilderwithsearch(searchvalue) {
        var tableId = document.getElementById('valuetable')
        data.map((item) => {
            if ((searchvalue.type == "ANY") || ((item.type == searchvalue.type))) {
                if ((searchvalue.status == "ANY") || ((item.status == searchvalue.status))) {
                    if (((Number(item.price) === 0)) || Number(item.price) >= Number(searchvalue.price)) {
                        if (Number(item.bedroom) >= Number(searchvalue.bedroom)) {
                            if (Number(item.bathroom) >= Number(searchvalue.bathroom)) {
                                if (Number(item.garden) >= Number(searchvalue.garden)) {
                                    let gardenvalue = GardenValueArray(Number(item.garden))
                                   // console.log(" The garden value is " + gardenvalue)
                                    let itemArray = [item.address, gardenvalue, item.status, item.bedroom, item.bathroom, item.type, item.price]
                                    console.log(itemArray)
                                    rowbuilder(itemArray);
                                }
                            }
                        }
                    }
                }
            }

        }
        )
    }
    function rowbuilder(item) {
        var tableId = document.getElementById('valuetable')
        var newrow = tableId.insertRow(0)
        for (let i = 0; i < item.length; i++) {
          //  console.log(" The row value is " + item[i])
            var newcell = newrow.insertCell(i)
            newcell.innerHTML = item[i]
        }

    }
    return (

        <><div className="PropForm">
            {/* {PropertyForm((props) => setData(props))} */}
            {/* The searchHandler is the actual method in the Property form, so the methods are always on the left */}
            <PropertySearch searchHandler={searchHandler} />
        </div>
            <div className="PropertyApp">
                <Table responsive="lg" style={{borderRadius: "14px"}}>
                    <thead>
                        <tr style={{ backgroundColor: "rgb(255, 192, 203)"}}>
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
                        {data.map((item) => (
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
                                                <Link className='withdrawLink' style={{ marginTop: "4px" }} state={{ properties: item }} to={`/property/${item.id}/resubmit`}>Resubmit</Link>

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
            </div></>
    );
}
export default ViewProperties;