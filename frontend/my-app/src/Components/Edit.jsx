import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios, { Axios } from 'axios';
function Edit() {

    const {id}=useParams()
    console.log("id recieved",id);
    const navigate=useNavigate()
    
    const [title,settitle]=useState()
    console.log(title);
    
    const [author,setauthor]=useState()
    console.log(author);
    
    const[category,setcategory]=useState()
    console.log(category);

    const[language,setlanguage]=useState()
    console.log(language);
    
    const[publishedyear,setpublishedyear]=useState()
    console.log(publishedyear);

    const[Count,setCount]=useState()
    console.log(Count);
    
    

    const getbook = async()=>{
        try{
                const responce= await axios.get(`http://localhost:8000/viewbook/${id}`)
                const book=responce.data;
                 settitle(book.title);
                 setauthor(book.author);
                 setCount(book.count);
                 setcategory(book.category);
                 setlanguage(book.language);
                 setpublishedyear(book.publishedyear)
        }
        catch{

        }
    }
   useEffect(() => {
    getbook();
  }, [id]);

  const updatebook =async() =>{
    const body={title,author,publishedyear,category,Count,language}
    try{
          const result=await axios.put(`http://localhost:8000/update/${id}`,body)
          console.log(result);
          alert(result.data.message);
          navigate('/')
          
    }
    catch (error){
      console.log(error);
      
    }
  }

  return (
    <>
     <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home" style={{color:'white'}}>Library</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">
              <Link to='/Addnew'><button className="nav-button">Add New</button></Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
        <div className="form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Welcome to the Library</h2>
            <p>Find your next favorite book</p>
          </div>
          
          <div className="form-content">
            <Form.Group className="form-group">
              <Form.Label>Book Name</Form.Label>
              <Form.Control type="text" placeholder="Enter book title"  className="form-input" value={title}   onChange={(e) => settitle(e.target.value)}/>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Author Name</Form.Label>
              <Form.Control type="text" placeholder="Enter author name"  className="form-input" value={author}  onChange={(e) => setauthor(e.target.value)}  />
            </Form.Group>

             <Form.Group className="form-group">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter book category" className="form-input" value={category}   onChange={(e) => setcategory(e.target.value)}   />
            </Form.Group>

             <Form.Group className="form-group">
              <Form.Label>Language</Form.Label>
              <Form.Control type="text" placeholder="Enter book language" className="form-input" value={language}   onChange={(e) => setlanguage(e.target.value)}  />
            </Form.Group>

             <Form.Group className="form-group">
              <Form.Label>Published year</Form.Label>
              <Form.Control type="number" placeholder="Enter book published year"  className="form-input" value={publishedyear}   onChange={(e) => setpublishedyear(e.target.value)}  />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Count</Form.Label>
              <Form.Control type="number" placeholder="Enter number of books" className="form-input" value={Count}   onChange={(e) => setCount(e.target.value)}   />
            </Form.Group>

            <button className="submit-button" onClick={updatebook}>Update Book</button>
          </div>
        </div>
      </div> 
    
    </>
  )
}

export default Edit