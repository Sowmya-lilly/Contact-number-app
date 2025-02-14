
import './App.css';
import { database } from './firebase';
import React from 'react';
import "./style.css"
import AddContact from './AddContact';
import EditContact from './EditContact';
/*Logic to read the data from firestore db
      call one method called collection
      onSnapshot will take the photo 
      snapshot is a variable to store the photo as a doc in an array using map function(i)
      i points to doc1,doc2...*/ 

function App() {
  const [ showContact, setShowContact ] = React.useState(false)//call AddContact component
  
  const [ contactsData, setContactsData ] = React.useState([])
  //console.log(contactsData)

  const [ showEditContact, setShowEditContact ] = React.useState(false)
  //showEditContact = false

  const [ editDocumentId, setEditDocumentId ] = React.useState("")
  //editDocument = ""
  const [ inputBoxData, setInputBoxData ] = React.useState("")
  const output =  contactsData.filter(function(i)
  {
    //console.log(i.name)
    return i.data.name.toLowerCase().includes(inputBoxData.toLowerCase())
  })

  //console.log(output)//output variable contains filtered data
  //if output = [] =>no contact is matched/empty array ==>message:No contact Matched

   React.useEffect(function()
  {
    
      database.collection("contacts-collection").onSnapshot(function(snapshot)
        {
          setContactsData(snapshot.docs.map(function(i)
        {
          //console.log(i.data())
          return { data: i.data(), documentId: i.id }
        }))

        })
  }, []) 
  
  function displayAddContactForm()
  {
    //logic display contact form with 3 input box
    //Logic to call AddContact component
    setShowContact(true)
  }

  function collectTheData(event)
  {
    setInputBoxData(event.target.value)
  }

  function deleteTheData(documentId)//one more function for pass as the argument
  {
   // console.log(document)
   database.collection("contacts-collection").doc(documentId).delete()
  }

  function updateTheData(documentId)
  {
    setEditDocumentId(documentId)
    //{showEditContact === true ? <EditContact /> :null}
    setShowEditContact(true)
    
    //console.log(document)
    // database.collection("contacts-collection").doc(document).update({
    //   email:
    //   mobileno:
    //   name:
    // })

  }

  return (
    showContact == true ? <AddContact />:showEditContact == true ? <EditContact id={editDocumentId}/>:
    <div style={ {marginLeft:"20px", marginTop:"15px"} }>
      <h2 style={ {fontSize:"30px",fontWeight:900, color:"white", marginBottom:"15px", textShadow:"1px 2px 3px whitesmoke", textTransform:"uppercase"} }>Welcome to Contact App</h2>
      <div className="row" style={ {flexWrap:'wrap'} }>
        <div className="col-md-4" >
        <input className="form-control" onChange={collectTheData}  type='text' placeholder='Search your contact here'/>
        </div>
        <button className="col-md-2 btn btn-success" onClick={displayAddContactForm}>Add Contact</button>
      </div>

      {output.length == 0 ? 
      <h2 style={ {color:"white", fontWeight:300}}>No contacts Matched</h2>
    :
    <div id="parentcard" style={{marginTop:"20px"}}>

      {/* chnage from contactData to output
      {contactsData.map(function(i){ */}
       {output.map(function(i){
       // console.log(i)
      //  return <div>
      //   <h3>{i.name}</h3>
      //  <h3>{i.email}</h3>
      //  <h3>{i.mobileno}</h3> 

      return <div class="card" style={ {width: "35rem", marginTop:"10px"} }>
  <div class="card-body">
    <h3 class="card-title" style={ {fontWeight : 900} }>Name:{i.data.name}</h3>
    <h4>Mobile Number:{i.data.mobileno}</h4>
    <h4>email:{i.data.email}</h4>

    <button style={{marginRight:"10px"}} class="btn btn-info" onClick={
      //can't access "document" directly hence use one callback function 
      function()
      {
        updateTheData(i.documentId)
      }
    }> Update</button>
    
    <button class="btn btn-danger" onClick={function(){
      deleteTheData(i.documentId)}//id is a inbuilt property
    }> Delete</button>    
  </div>
</div>
       
      })
    }
           
    </div>
    }
                 
      
    </div>
  );
}

export default App;
