import './App.css';
import { useEffect, useState } from "react";

function App() {

  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);


  const handleForm= (e)=>{
// console.log(e.target.value, e.target.name);
setForm({
  ...form,
  [e.target.name] : e.target.value
})
}

const handleSubmit= async (e) => {
  // e.preventDefault();

  const response = await fetch("http://localhost:8080/demo",{
    // method:'POST'
    method:'POST',
    body: JSON.stringify(form),
    headers:{
      'Content-Type' : 'application/json'
    }
  })
  const data= await response.json();
  console.log(data);
}

const getUsers = async () =>{
  const response= await fetch("http://localhost:8080/demo",{
    method:'GET',
  })
  const data= await response.json();
  setUsers(data);
}

useEffect(()=>{
  getUsers();
},[])

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form" >
      
        <span>Username :</span>
        <input type="text" placeholder="username" name="username" className="input" onChange={handleForm}></input><br></br><br></br>
        <span>Password :</span>&nbsp;

        <input type="text" placeholder="password" name="password" className="input" onChange={handleForm}></input><br></br><br></br>

        <button className="btn">Submit</button>

        <p className='output'>{JSON.stringify(form)}</p>
      </form>

      <div className='output2'>
       {/* <div> */}
        <ul>
         {users.map(user=> <li>{user.username},{user.password}</li>)}
        </ul>
      </div>
      
    </div>
  );
}

export default App;
