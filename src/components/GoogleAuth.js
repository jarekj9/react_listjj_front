import React from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuth = ({handleLogin}) => {
    const clientId = window.GOOGLE_AUTH_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={credentialObj => {
                    const decodedJwt = jwtDecode(credentialObj.credential);
                    const loginData = { 'Email': decodedJwt.email, 'Password':'WillBeIgnored123', 'GoogleJwt': credentialObj.credential};
                    handleLogin(loginData);
                }}
                onError={() => {
                    toast.error('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;