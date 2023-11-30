import React from 'react';
import { Navigate } from 'react-router-dom';
 
export function RouteGuard({ component }) {
   function hasJWT() {
       let flag = false;
       localStorage.getItem("token") ? flag=true : flag=false
       return flag
   }

  if (!hasJWT()) {
    return <Navigate to="/login" />;
  }

  return component;
}

export default RouteGuard;