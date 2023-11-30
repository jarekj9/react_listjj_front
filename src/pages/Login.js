import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
    const loginUrl = 'https://localhost:5001/api/login';
    const loginData = { 'Email': email, 'Password': password };
    const headers = {'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json'}
    const response = axios.post(loginUrl, loginData, headers)
        .then(({data }) => {
            console.log('Login successful! Token:', data.token);
            localStorage.setItem("token", data.token);
            window.location.href = '/';
        })
        .catch(err =>console.log(err));
};

  return (
    <div class="container col-sm-12 col-md-10 col-lg-6 col-xl-4">
      <div class="card">  
        <div class="card-header">
          <h3>ListJJ</h3>
        </div>    
      <div class="card-body">
          <div class="d-flex flex-row justify-content-center">
            <div class="d-flex flex-column justify-content-center">
              <div class="p-2 align-self-start">
                <label>Email:</label>
              </div>
              <div class="p-2 align-self-start">
                <label>Password:</label>
              </div>
            </div>
            <div class="d-flex flex-column">
            <div class="p-2">
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div class="p-2">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </div>
          <div class="d-flex flex-row justify-content-center">
            <button class="btn btn-secondary mt-3" onClick={handleLogin}>Login</button>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Login;