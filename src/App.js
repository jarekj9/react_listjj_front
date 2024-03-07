import "./styles.css";
import './sidebarStyles.css';
import './tagsInputStyles.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Base from "./pages/Base";
import Items from "./pages/Items";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import RouteGuard from "./components/RouteGuard";
import { history } from './helpers/History';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faBars, faTrash, faEdit, faSave, faArrowUp, faArrowDown, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import { useDispatch } from 'react-redux';



function App() {

  library.add(faCheckSquare, faBars, faTrash, faEdit, faSave, faArrowUp, faArrowDown, faMagnifyingGlass, faPlus)

  const dispatch = useDispatch();
  if(localStorage.getItem("token")){
    dispatch({type: 'LOGIN'});
  }
  else {
    dispatch({type: 'LOGOUT'});
  }

  return (
    
    <div className="App">
      <ToastContainer position="bottom-right"/>  
      <Router history={history}>
        <Routes>
          <Route index element={<RouteGuard component={<Base component={Items} />} />} />
          <Route path="/items" element={<RouteGuard component={<Base component={Items} />} />} />
          <Route path="/categories" element={<RouteGuard component={<Base component={Categories} />} />} />
          <Route path="/users" element={<RouteGuard component={<Base component={Users} />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<RouteGuard component={<Logout />} />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;