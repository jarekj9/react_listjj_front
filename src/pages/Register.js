import React, { useState, useContext } from 'react';
import api from '../ApiConfig.js';
import { toast } from 'react-toastify'; 
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onRegisterClick = async () => {
    const RegisterData = { 'Email': email, 'Password': password, 'ConfirmPassword': confirmPassword};
    handleRegister(RegisterData);
  };

  const handleRegister = async (RegisterData) => {
    if(password !== confirmPassword){
      toast.error('Passwords do not match');
      return;
    }
    const RegisterUrl = '/api/accounts/register';
    const headers = {'Content-Type': 'application/json;charset=UTF-8', 'Accept': 'application/json'}
    const response = api.post(RegisterUrl, RegisterData, headers)
        .then(({data }) => {
            if(data.successful){
              setRegisterSuccess(true);
            }
        })
        .catch(err => {
          toast.error('Register Failed');
          console.log(err);
        });
  }

  
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
              <div className="p-2">
                <label className="d-flex align-self-start text-secondary">Password confirm:</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </div>
          </div>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-secondary my-3" onClick={onRegisterClick}>Register</button>
          </div>
        </div> 

        <div>
          {registerSuccess && (
            <div className="d-flex flex-row justify-content-center">
              <div className="alert alert-success" role="alert">
                Registration is successful, but administrator needs to approve the account.
                <h5><Link className="" to="/login">Log in</Link></h5>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default Register;