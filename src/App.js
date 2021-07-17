import "./App.css";
import { useState } from "react";
import { json } from "body-parser";

const App = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [accessToken,setAccessToken]= useState('');
  const [refreshToken,setRefreshToken]= useState('');
  const [apartments,setApartments]= useState([]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const Login = () => {
    console.log(loginEmail, loginPassword);
    fetch("http://localhost:4000/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res=>{
    return  res.json()
    }).then(res=>{
      if(res.accessToken && res.refreshToken){
        setRefreshToken(res.refreshToken)
        setAccessToken(res.accessToken)
      }else {
        alert(res.message)
      }
      console.log(res)})
    .catch(e=>{
      console.log(e);
    });
  };

const Register = () => {
  fetch("http://localhost:4000/users", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
      }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res=>{
    return  res.json()
    }).then(res=>console.log(res))
    .catch(e=>{
      console.log(e);
    });
}

const getApartments = () => {
  fetch("http://localhost:4000/apartment", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}` 
      },
    }).then(res=>{
    return  res.json()
    }).then(res=>setApartments(res))
    .catch(e=>{
      console.log(e);
    });
}

  return (
    <div className="App">
      <div className="column">
        <h3>Login</h3>
        <div>
          <label>
            <input
              type="text"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="button" onClick={Login}>
          Login
        </button>
      </div>

      <div className="column">
        <h3>Register</h3>
        <div>
          <label>
            <input
              type="text"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="button" onClick={Register}>
          Register
        </button>
      </div>
      <div>
        <div className='column'><p>{accessToken}</p></div>
        <div className='column'><p>{refreshToken}</p></div>
      </div>
      <div>
        <button type='button' onClick={getApartments}>GetApartments</button>
        <div>{JSON.stringify(apartments)}</div>
      </div>
    </div>
  );
};

export default App;
