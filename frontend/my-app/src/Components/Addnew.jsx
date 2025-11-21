import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
function Addnew() {

    const [title,settitle]=useState()
    console.log(title);

    const[author,setauthor]=useState()
    console.log(author);
    
    const[publishedyear,setpublishedyear]=useState()
    console.log(publishedyear);
    
    const[language,setlanguage]=useState()
    console.log(language);
    

    const[category,setcategory]=useState()
    console.log(category);
    
    const[count,setcount]=useState()
    console.log(count);
    

    const navigate=useNavigate()


    const addbook =async(event)=>{
        event.preventDefault();
        const body={title,author,language,publishedyear,category,count}
        try{
            const result= await axios.post("http://localhost:8000/addnewbook",body)
            console.log(result);
            alert(result.data.message);
            navigate('/')
            
        }
        catch(error)
        {
            console.log(error);
            
        }
    }

  return (
    <>  

    
    <div className="form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Welcome to the Library</h2>
            <p>Find your next favorite book</p>
          </div>
          
          <div className="form-content">
            <Form.Group className="form-group">
              <Form.Label>Book Name</Form.Label>
              <Form.Control type="text" placeholder="Enter book title" onChange={(e)=>settitle(e.target.value)} className="form-input" />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Author Name</Form.Label>
              <Form.Control type="text" placeholder="Enter author name" onChange={(e)=>setauthor(e.target.value)} className="form-input" />
            </Form.Group>

             <Form.Group className="form-group">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter book category" onChange={(e)=>setcategory(e.target.value)}className="form-input" />
            </Form.Group>

             <Form.Group className="form-group">
              <Form.Label>Language</Form.Label>
              <Form.Control type="text" placeholder="Enter book language" onChange={(e)=>setlanguage(e.target.value)} className="form-input" />
            </Form.Group>

             <Form.Group className="form-group">
              <Form.Label>Published year</Form.Label>
              <Form.Control type="number" placeholder="Enter book published year" onChange={(e)=>setpublishedyear(e.target.value)} className="form-input" />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Count</Form.Label>
              <Form.Control type="number" placeholder="Enter number of books" onChange={(e)=>setcount(e.target.value)} className="form-input" />
            </Form.Group>

            <button className="submit-button" onClick={addbook}>Add Book</button>
          </div>
        </div>
      </div> 
      </>
  )
}

export default Addnew