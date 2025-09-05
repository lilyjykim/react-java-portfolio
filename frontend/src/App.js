import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const[users, setUsers] = useState([]);
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = () => {
    axios.get("http://localhost:8080/api/users")
        .then(response =>{
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/users",{
        name : name,
        email : email,
        password : password
    })
    .then(response => {
    console.log("response.data:", response.data);  // 👈 이걸로 구조 확인
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

//  useEffect(()=>{
//    axios.get("http://localhost:8080/api/users")
//        .then(response =>{
//            setUsers(response.data);
//        })
//        .catch(error =>{
//            console.error("Error fetching users:",error);
//        })
//  },[]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>

      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
