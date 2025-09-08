import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, ListGroup, Card } from "react-bootstrap";


function App() {
  const[users, setUsers] = useState([]);
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[editingId, setEditingId] = useState(null);

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = () => {
    axios.get("http://localhost:8080/api/users")
        .then(response =>{
            setUsers(response.data);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        })
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if(editingId){
        // update 로직
        handleUpdate();
    } else {
        // register 로직
        handleRegister();
    }
  };

  const clickDelete = (id) => {
    if(window.confirm("Do you want to delete?")){
        axios.delete(`http://localhost:8080/api/users/${id}`)
            .then(()=>{
                alert("Selected data deleted.");
                fetchUsers();// 삭제 후 목록 갱신
            })
            .catch(error =>{
                console.error("Error deleting user: "+ id,error);
            })
    }
  };

  const clickEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
  }
  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/users/${editingId}`,{
        name,
        email,
        password
    }).then(()=>{
        alert("User updated successfully.");
        setEditingId(null);
        fetchUsers();
        setName("");
        setEmail("");
        setPassword("");
    })
  };
  const handleRegister = () => {
      axios.post("http://localhost:8080/api/users",{
              name : name,
              email : email,
              password : password
          })
          .then(response => {
//          console.log("response.data:", response.data);  // 👈 이걸로 구조 확인
              alert("User created with ID: " + response.data);
              setName("");
              setEmail("");
              setPassword("");
              fetchUsers(); // 등록 후 사용자 목록 갱신
          })
          .catch(error => {
              console.error("Error creating user: ", error);
          });
  }

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setPassword("");
  };


  return (
  <Container className="py-4">
      <Row>
          <Col md={6}>
              <h2>User List</h2>
              <ListGroup>
                  {users.map(user => (
                      <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                          <div>
                              <strong>{user.name}</strong> ({user.email})
                          </div>
                          <div>
                              <Button variant="danger" size="sm" className="me-2" onClick={() => clickDelete(user.id)}>Delete</Button>
                              <Button variant="warning" size="sm" onClick={() => clickEdit(user)}>Edit</Button>
                          </div>
                      </ListGroup.Item>
                  ))}
              </ListGroup>
          </Col>
  
          <Col md={6}>
              <h2>{editingId ? "Edit User" : "Create User"}</h2>
              <Card>
                  <Card.Body>
                      <Form onSubmit={formSubmit}>
                          <Form.Group className="mb-3">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  required
                              />
                          </Form.Group>
  
                          <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                              />
                          </Form.Group>
  
                          <Form.Group className="mb-3">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                              />
                          </Form.Group>
  
                          <div className="d-flex gap-2">
                              <Button type="submit" variant="primary">
                                  {editingId ? "Update" : "Register"}
                              </Button>
                              {editingId && (
                                  <Button type="button" variant="secondary" onClick={resetForm}>
                                      Cancel
                                  </Button>
                              )}
                          </div>
                      </Form>
                  </Card.Body>
              </Card>
          </Col>
      </Row>
  </Container>
  );
}

export default App;
