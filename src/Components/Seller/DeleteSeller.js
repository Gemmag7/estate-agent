import { useParams } from "react-router-dom"

function DeleteSeller(){

    let {id} = useParams()
    let ref = fetch(`https://localhost:7091/Seller/${id}`, {
        method:"DELETE", 
       
    })
    ref.then((x) => console.log(x))
    
    return(
        <>
        <input
        type="button"
        id="btn1"
        value="Delete"
        onclick="DeleteSeller()"/>

</>
    )
}

export default DeleteSeller;