import { useDispatch } from 'react-redux';

const Logout = () =>{
    const dispatch = useDispatch();
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem("token");

    return(
        <div>
            <h1>Logged out</h1>
        </div>
    )
}

export default Logout;