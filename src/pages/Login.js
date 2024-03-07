import React, { useState, useContext } from 'react';
import api from '../ApiConfig.js';
import GoogleAuth from '../components/GoogleAuth.js';
import { toast } from 'react-toastify'; 
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const onLoginClick = async () => {
  const loginData = { 'Email': email, 'Password': password};
  handleLogin(loginData);
};

const handleLogin = async (loginData) => {
  const loginUrl = '/api/login';
  const headers = {'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json'}
  const response = api.post(loginUrl, loginData, headers)
      .then(({data }) => {
          localStorage.setItem("token", data.token);
          window.location.href = '/';
      })
      .catch(err => {
        toast.error('Login Failed');
        console.log(err);
      });
};

  return (
    <div className="container col-sm-12 col-md-10 col-lg-6 col-xl-4">
      <div className="card">  
        <div className="card-header">
          <h3>ListJJ</h3>
        </div>    
      <div className="card-body">
          <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-column">
              <div className="p-2">
                <label className="d-flex align-self-start text-secondary">Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="p-2">
              <label className="d-flex align-self-start text-secondary">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-secondary mt-3" onClick={onLoginClick}>Login</button>
          </div>
          <div className="d-flex flex-row justify-content-center p-5">
            <GoogleAuth handleLogin={handleLogin}/>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <h5><Link className="" to="/register">Register</Link></h5>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Login;