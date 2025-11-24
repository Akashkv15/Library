import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Home() {

  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  // Fetch all books
  const fetchdata = async () => {
    try {
      const ress = await fetch("http://localhost:8000/viewbooks");
      const bookdata = await ress.json();
      console.log(bookdata);
      setdata(bookdata.books);
    } catch (error) {
      console.log("Error while fetching:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Delete book
  const deletedata = async (myid) => {
    try {
      const result = await axios.delete(`http://localhost:8000/deletebook/${myid}`);
      console.log("deleted", result);
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  };

  // Navigate to edit page
  const updatebook = (editid) => {
    navigate(`/Edit/${editid}`);
  };

  // Change count
  const changecount = async (countid) => {
    try {
      const result = await axios.put(`http://localhost:8000/changecount/${countid}`);
      console.log(result.data);

      // Show alert when count hits zero
      // if (result.data.updatedBook.count == 0) {
      //   alert("This book is now out of stock!");
      // }

      fetchdata(); // refresh UI
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("No stock available!");
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand style={{ color: 'white' }}>Library</Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link>
              <Link to='/Addnew'>
                <button className="nav-button">Add New</button>
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Cards Section */}
      <Container className="mt-4">
        <div className="row justify-content-center">

          {data.map((res, index) => (
            <div className="col-lg-4 col-md-6 col-sm-10 mb-4" key={res._id}>

              <Card className="card text-center">

                <Card.Body>
                  <Card.Title><h1>{res.title}</h1></Card.Title>

                  <Card.Text>
                    <h5>ID: {index + 1}</h5>
                    <h4>Author: {res.author}</h4>
                    <h4>Category: {res.category}</h4>
                    <h4>Language: {res.language}</h4>
                    <h4>Published Year: {res.publishedyear}</h4>
                    <h4>Count: {res.count}</h4>
                  </Card.Text>

                  <Button 
                    variant="primary" 
                    className="me-2" 
                    onClick={() => updatebook(res._id)}
                  >
                    Edit
                  </Button>

                  <Button 
                    variant="danger" 
                    className="me-2"
                    onClick={() => deletedata(res._id)}
                  >
                    Delete
                  </Button>

                  <Button 
                    variant="success"
                    onClick={() => changecount(res._id)}
                  >
                    Sold
                  </Button>
                </Card.Body>

              </Card>

            </div>
          ))}

        </div>
      </Container>
    </>
  );
}

export default Home;
