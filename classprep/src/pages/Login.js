import React from 'react';
import PropTypes from 'prop-types';
import { useState } from "react";
import Authenticated from '../components/Authentication';
import { useNavigate } from "react-router-dom";

async function loginUser(credentials) {
  return fetch('http://localhost:5001/login?username='+credentials.username+'&password='+credentials.password, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [visibility, setVisibility] = useState("invisible");
  const [auth, setAuth] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    if (token.authentication=="failure"){
      setVisibility("visible");
    } else{
      setToken(token);
      setAuth(true);
    }
  }
  let navi = useNavigate();
  if(auth || Authenticated()) {
    navi('/Classlist');
  }
  if(setToken==undefined){
    navi("/");
  }
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div className={visibility}>
          <p>error. Username and Password do not match.</p>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}