import React from "react";
import "./style.css"
import { database } from "./firebase";

function AddContact() {

    const [ fetchedContactName, setFetchedContactName ] = React.useState("")
    function collectContactName(event)
    {
        setFetchedContactName(event.target.value)
    }

    const [ fetchedContactMobileNo, setFetchedContactMobileNo ] = React.useState("")
    function collectContactMobileNo(event)
    {
        setFetchedContactMobileNo(event.target.value)
    }

    const [ fetchedContactEmail, setFetchedContactEmail ] = React.useState(0)
    function collectContactEmail(event)
    {
        setFetchedContactEmail(event.target.value)
    }

    function saveTheData()
    {
        //Logic to store data in firestore database
        database.collection("contacts-collection").add( {
            name:fetchedContactName,
            mobileno:fetchedContactMobileNo,
            email:fetchedContactEmail
        })
        alert("Contact Details Saved Successfully")
    }
    

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="mb-3">
                    <label>Contact Name:</label>
                    <input onChange={collectContactName}  type="text" className="form-control" placeholder="Enter Contact Name" />
                </div>

                <div className="mb-3">
                    <label>Contact Mobile Number:</label>
                    <input onChange={collectContactMobileNo} type="text" className="form-control" placeholder="Enter Contact Mobile Number" />
                </div>

                <div className="mb-3">
                    <label>Contact Email ID:</label>
                    <input onChange={collectContactEmail} type="email" className="form-control" placeholder="Enter Contact Email ID" />
                </div>

                <button className="btn btn-primary" onClick={saveTheData}>Save Contact</button>
            </div>
        </div>
    );
}

export default AddContact;
