const Logout = () =>{

    localStorage.removeItem("token");
    return(
        <div>
            <h1>Logged out</h1>
        </div>
    )
}

export default Logout;