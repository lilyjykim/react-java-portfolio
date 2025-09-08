import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button onClick={()=> clickDelete(user.id)} style={{marginLeft:'10px'}}>Delete</button>
            <button onClick={()=> clickEdit(user)} style={{marginLeft:'10px'}}>Edit</button>
          </li>
        ))}
      </ul>

      <h2>{editingId ? "Edit User" : "Create User"}</h2>
      <form onSubmit={formSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editingId ? "Update" : "Register"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setEmail("");
              setPassword("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default App;
//        <button type="clear" onClick={()=> handleClear()} style={{marginLeft:'10px'}} >Clear</button>
//e.preventDefault();