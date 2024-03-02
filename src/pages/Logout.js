import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

const Logout = () =>{
    const dispatch = useDispatch();
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem("token");


    return(
        <div>
            <h1>Logged out</h1>
            <h5><Link className="" to="/login">Log back in</Link></h5>
        </div>
    )
}

export default Logout;