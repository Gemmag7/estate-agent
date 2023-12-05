import { useParams } from "react-router-dom"

function DeleteSeller(){

    let {id} = useParams()
    let ref = fetch(`http://localhost:3000/seller/${id}`, {
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