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
    <div>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;