import React, { useEffect, useState } from 'react';
import "./App.css"
const App = () => {
  const [users, setUsers] = useState([]);

  async function getData(limit = 0, skip = 0) {
    try {
      let apiRes = await fetch(
        `http://localhost:8500/api/user?limit=${limit}&skip=${skip}&sort=-age`
      );
      let result = await apiRes.json();
      setUsers(result.data || result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px"}}>
      {users.length > 0 ? (
        users.map((user, index) => (
          <div
            key={index}
            className="card"
            style={{ width: "18rem", padding: "10px", border: "1px solid #15c9c0", borderRadius: "10px" }}
          >
            <div className="card-body">
              <h2 className="card-title" style={{color: "#15c9c0"}}>{user.username}</h2>
              <p className="card-text">{user.email}</p>
              <p className="card-text">Age: {user.age}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;