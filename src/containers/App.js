import React, {useState, useEffect} from "react";
import './App.css';
import Autocomplete from "../components/Autocomplete";

const App = () => {
  
  const [users, setUsers] = useState([]); // storing user's data

  // fetching all the user data from backend
  useEffect(() => {
  fetch('http://localhost:5000/users')
    .then(response => response.json())
    .then(data => setUsers([...data]))
    .catch(err => console.log(err, "Unable to do GET Request"))
  }, [])
  
  return (
    <div className="App">
      <h1>React Autocomplete SearchBox</h1>
      <Autocomplete
        options={users}
      />
    </div>
  );
};

export default App;

