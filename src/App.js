import "./styles.css";
import './sidebarStyles.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import RouteGuard from "./components/RouteGuard";
import { history } from './helpers/history';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faBars } from '@fortawesome/free-solid-svg-icons'


import { useDispatch } from 'react-redux';

function App() {

  library.add(faCheckSquare, faBars)

  const dispatch = useDispatch();
  if(localStorage.getItem("token")){
    dispatch({type: 'LOGIN'});
  }
  else {
    dispatch({type: 'LOGOUT'});
  }


  return (
    
    <div className="App">      
      <Router history={history}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<RouteGuard component={<Home />} />} />
          <Route path="/home" element={<RouteGuard component={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<RouteGuard component={<Logout />} />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;