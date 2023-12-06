import  PropertySearch from "./PropertySearch";
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
function Gardenvalue(props) {

    if (props.garden == 0){
        return <td>No</td>
    }
    else
    {
         return <td>Yes</td>
    }
}

function GardenValueArray(props) {
    console.log(" The incoming value is "+props)
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
// the constant searcher value is used to set the search value to the value recieved from the flowFrom: 

    
function ViewProperties() {
    // Declare a new state variable, which we'll call "searchvalue" the state of search value it recieved 
    //from the form then when we will use it to filter the item
    let searchvalue = useState({});
    const searchHandler = (search) => {
         searchvalue = search;
         if(search.bedroom || search.bathroom != 0)
         {
            // getting the table id for manipulation then running the custom search method with the table builder
            var table =  document.getElementById('valuetable')
            while (table.hasChildNodes()) {
                table.removeChild(table.lastChild);
              }
              tablebuilderwithsearch(searchvalue)
         }
    };
  // Fetch method to get data from the json and then display it as data
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3004/property")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // Builds the tables based on the search entries.
  function tablebuilderwithsearch(searchvalue){
    var tableId = document.getElementById('valuetable')
    data.map((item) => {
        if((searchvalue.type == "ANY") || ((item.type == searchvalue.type)))
        {
            if((searchvalue.status == "ANY") || ((item.status == searchvalue.status)))
            {
                if(((Number(item.price)===0))|| Number(item.price)>= Number(searchvalue.price))
                {
                    if(Number(item.bedroom) >= Number(searchvalue.bedroom))
                    {
                        if(Number(item.bathroom) >= Number(searchvalue.bathroom))
                        {
                            if(Number(item.garden) >= Number(searchvalue.garden))
                            {
                                let gardenvalue = GardenValueArray(Number(item.garden))
                                console.log(" The garden value is "+gardenvalue)
                                let itemArray = [item.address,gardenvalue,item.status,item.bedroom,item.bathroom,item.type,item.price]
                                
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
  function rowbuilder(item){ 
    var tableId = document.getElementById('valuetable')
        var newrow = tableId.insertRow(0)
    for(let i=0;i<7;i++)
    {
        console.log(" The row value is "+item[i])
        var newcell = newrow.insertCell(i)
        newcell.innerHTML = item[i] 
    }

  }
  return (
    
    <><div className="PropForm">
        {/* {PropertyForm((props) => setData(props))} */}
        {/* The searchHandler is the actual method in the Property form, so the methods are always on the left */}
          <PropertySearch searchHandler= {searchHandler}/>
      </div>
      <div className="PropertyApp">
                      <Table responsive="lg">
                      <thead>
                      <tr>
                          <th className="Addclass"> <i className="bi bi-house"> </i> &nbsp;Address</th>
                          <th> <i className="bi bi-tree"></i>&nbsp;Garden</th>
                          <th> &nbsp;Status</th>
                          <th> &nbsp;Bedroom</th>
                          <th> &nbsp;Bathroom</th>
                          <th> <i className="bi bi-house"> </i>&nbsp;Type</th>
                          <th> <i className="bi bi-cash-coin"></i>&nbsp;Price</th>
                      </tr>
                  </thead>
                  <tbody id="valuetable">
                      {data.map((item) => (
                       <tr key={item.id}>
                       <td className="Addclass">{item.address}</td>
                       <Gardenvalue garden={item.garden} />
                       <td>{item.status}</td>
                       <td>{item.bedroom}</td>
                       <td>{item.bathroom}</td>
                       <td>{item.type}</td>
                       <td>{item.price}</td>
                       </tr>
                      ))}
                  </tbody>
              </Table>
          </div></>
  );
}
export default ViewProperties;