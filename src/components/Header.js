import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header = props => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const Navigation = () => (
      <span className="header d-flex justify-content-start align-items-center">
        {isLoggedIn && <Link className="btn btn-secondary ms-5" to="/items">Items</Link> }
        {isLoggedIn && <Link className="btn btn-secondary ms-2" to="/categories">Categories</Link> }
        {isLoggedIn && <Link className="btn btn-secondary mx-2" to="/logout">Logout</Link> }
        {!isLoggedIn && <Link className="btn btn-secondary mx-2" to="/login">Login</Link> }
      </span>
    );

    return (
        <Navigation />
  );
};

export default Header;
