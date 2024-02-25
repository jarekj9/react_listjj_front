import { useDispatch } from 'react-redux';

const Logout = () =>{
    const dispatch = useDispatch();
    dispatch({type: 'LOGOUT'});
    localStorage.removeItem("token");

    return(
        <div>
            <h1>Logged out</h1>
            <h5><a href="/login">Log back in</a></h5>
        </div>
    )
}

export default Logout;