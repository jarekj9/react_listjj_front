import "./styles.css";
import './sidebarStyles.css';
import './tagsInputStyles.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Base from "./pages/Base";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import RouteGuard from "./components/RouteGuard";
import { history } from './helpers/History';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faBars, faTrash, faEdit, faSave, faArrowUp, faArrowDown, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'


import { useDispatch } from 'react-redux';
import Categories from "./pages/Categories";


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
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<RouteGuard component={<Logout />} />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;