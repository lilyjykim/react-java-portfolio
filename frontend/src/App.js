import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const[users, setUsers] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/api/users")
        .then(response =>{
            setUsers(response.data);
        })
        .catch(error =>{
            console.error("Error fetching users:",error);
        })
  },[]);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user =>(
            <li key={user.id}>
                <strong>{user.name}</strong> ({user.email})
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
