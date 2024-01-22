import PropertySearch from "./PropertySearch";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import "./ViewProperty.css";

function ViewProperties() {
    let navigate = useNavigate();
    function Gardenvalue(props) {
        if (props.garden === 0) {
            return <td>No</td>;
        } else {
            return <td>Yes</td>;
        }
    }

    function handleDeleteProperty(property) {
        const confirmed = window.confirm("Are you sure you want to delete?");
        if (confirmed) {
            fetch(`https://localhost:7091/Property/${property.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: property.id }),
            })
            .then((res) => res.json())
            .then((res) => {
                navigate('/');
            });
        }
    }

    function GardenValueArray(props) {
        switch (props) {
            case 0:
                return "No";
            case 1:
                return "Yes";
            default:
                return "Yes";
        }
    }

    function generateProperties() {
        fetch("http://localhost:7091/Property")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err));
    }

    let searchvalue = useState({})[0]; // Extract the value from the array
    const searchHandler = (search) => {
        searchvalue = search;
        if (Number(search.bedroom) !== 0 || Number(search.bathroom) !== 0) {
            const table = document.getElementById('valuetable');
            while (table.hasChildNodes()) {
                table.removeChild(table.lastChild);
            }
            tablebuilderwithsearch(searchvalue);
        }
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        generateProperties();
    }, []);

    function tablebuilderwithsearch(searchvalue) {
        const filteredData = data.filter((item) => {
            return (
                (searchvalue.type === "ANY" || item.type === searchvalue.type) &&
                (searchvalue.status === "ANY" || item.status === searchvalue.status) &&
                ((Number(item.price) === 0) || Number(item.price) >= Number(searchvalue.price)) &&
                (Number(item.bedroom) >= Number(searchvalue.bedroom)) &&
                (Number(item.bathroom) >= Number(searchvalue.bathroom)) &&
                (Number(item.garden) >= Number(searchvalue.garden))
            );
        });
        const tableId = document.getElementById('valuetable');
        filteredData.forEach((item) => {
            let gardenvalue = GardenValueArray(Number(item.garden));
            let itemArray = [item.address, gardenvalue, item.status, item.bedroom, item.bathroom, item.type, item.price];
            console.log(itemArray);
            rowbuilder(itemArray);
        });
    }

    function rowbuilder(item) {
        const tableId = document.getElementById('valuetable');
        var newrow = tableId.insertRow(0);
        for (let i = 0; i < item.length; i++) {
            var newcell = newrow.insertCell(i);
            newcell.innerHTML = item[i];
        }
    }

    return (
        <>
            <div className="PropForm">
                <PropertySearch searchHandler={searchHandler} />
            </div>
            <div className="PropertyApp">
                <Table responsive="lg" style={{ borderRadius: "14px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "rgb(255, 192, 203)" }}>
                            <th><i className="fa fa-home"></i>&nbsp;Type</th>
                            <th className="Addclass"><i className="fa fa-home"> </i> &nbsp;Address</th>
                            <th ><i className="fa fa-money" ></i>&nbsp;Price</th>
                            <th><i className="fa fa-check-circle" style={{ margin: "0 auto", textAlign: "left" }}></i>&nbsp;Status</th>
                            <th><i className="fa fa-bed" style={{ margin: "0 auto", textAlign: "left" }}></i>&nbsp;Bedroom</th>
                            <th><i className="fa fa-bathtub" style={{ margin: "0 auto", textAlign: "left" }}></i>&nbsp;Bathroom</th>
                            <th><i className="fa fa-tree" style={{ margin: "0", textAlign: "left" }} ></i>&nbsp;Garden</th>
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
                                    {item.status === "WITHDRAWN" && (
                                        <Link className='withdrawLink' style={{ marginTop: "4px" }} state={{ properties: item }} to={`/property/${item.id}/resubmit`}>Resubmit</Link>
                                    )}
                                    <input
                                        style={{ marginRight: "4px" }}
                                        type='button'
                                        id='deleteBtn'
                                        value="Delete"
                                        onClick={() => handleDeleteProperty(item)}
                                    />
                                    <Link className="editLink" state={{ properties: item }} to={`/property/${item.id}/edit`}>Update</Link>
                                    {item.status === "FOR SALE" && (
                                        <Link className='withdrawLink' state={{ properties: item }} to={`/property/${item.id}/withdraw`}>Withdraw</Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default ViewProperties;