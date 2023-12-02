import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header = props => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const Navigation = () => (
      <span className="header d-flex justify-content-start align-items-center">
        <button className="btn btn-secondary mx-3" onClick={props.onClick}><FontAwesomeIcon icon="bars" /> </button>
        {isLoggedIn && <Link className="btn btn-secondary me-3" to="/home">Home</Link> }
        {isLoggedIn && <Link className="btn btn-secondary me-3" to="/logout">Logout</Link> }
        {!isLoggedIn && <Link className="btn btn-secondary me-3" to="/login">Login</Link> }
      </span>
    );

    return (
        <Navigation />
  );
};

export default Header;
