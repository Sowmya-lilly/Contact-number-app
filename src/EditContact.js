import React from "react";
import { database } from "./firebase";

function EditContact(props)
{
    
const [ particularContactInfo, setParticularContactInfo ] = React.useState("")
const [ contactName, setContactName] = React.useState("")
const [ contactMobileno, setContactMobileno] = React.useState("")
const [ contactEmail, setContactEmail] = React.useState("")
//particularContactInfo.name
// particularContactInfo.mobileno
// particularContactInfo.email 
    //console.log(props.id)
    //console.log(particularContactInfo)

    React.useEffect(function(){
        setContactName(particularContactInfo.name)
        setContactMobileno(particularContactInfo.mobileno)
        setContactEmail(particularContactInfo.email)
    },[particularContactInfo])

    function collectName(event)
    {
        setContactName(event.target.value)        
    }
    function collectMobileno(event)
    {
        setContactMobileno(event.target.value)        
    }
    function collectEmail(event)
    {
        setContactEmail(event.target.value)        
    }

    function updateTheData(){
        database.collection("contacts-collection").doc(props.id).update({
            name:contactName,
            email:contactEmail,
            mobileno:contactMobileno
            
                   })
    }

React.useState([])

    React.useEffect(function()
      {
        
        database.collection("contacts-collection").doc(props.id).get()
        .then(function(output){
            setParticularContactInfo(output.data())
        })
         .catch(function(error){
            alert(error)
         })
            
      }, []) 

    return(
        <div className="row">
            <div className="col-md-4">
                <div className="mb-3">
                    <label>Contact Name:</label>
                    <input onChange={collectName} className="form-control" value={contactName} placeholder="Enter Contact Name" />
                </div>

                <div className="mb-3">
                    <label>Contact Mobile Number:</label>
                    <input onChange={collectMobileno} className="form-control" value={contactMobileno} placeholder="Enter Contact Mobile Number" />
                </div>

                <div className="mb-3">
                    <label>Contact Email ID:</label>
                    <input onChange={collectEmail} className="form-control" value={contactEmail} placeholder="Enter Contact Email ID" />
                </div>

                <button className="btn btn-primary" onClick={updateTheData}>Update Contact</button>
            </div>
        </div>
    )
}
export default EditContact