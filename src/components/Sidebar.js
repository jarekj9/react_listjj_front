import { useContext, React, useState } from "react";
import { useLocation } from 'react-router-dom';
import AddNoteForm from "../components/AddNoteForm";
import AddCategoryForm from "../components/AddCategoryForm";
import AppContext from '../AppContext';
import { jwtDecode } from "jwt-decode";

const SideBar = props => {
    const {usernameCtx, roleCtx} = useContext(AppContext);
    const sidebarClass = props.isOpen ? "sidebar sidebarOpen d-flex flex-column" : "sidebar d-flex flex-column";
    const location = useLocation();

  return (
    <div className={sidebarClass}>
        <div className="container">
            <div className="row">
                <div className="col">
                        { (location.pathname === '/items' || location.pathname === '/') && 
                            <AddNoteForm refresh={props.refresh} categoriesData={props.categoriesData} setSideBarOpen={props.setSideBarOpen} itemsData={props.ItemsData}  /> }
                        { location.pathname === '/categories' && 
                            <AddCategoryForm refresh={props.refresh} categoriesData={props.categoriesData} itemsData={props.ItemsData}  /> }
                </div>
            </div>

        </div>
        <div className="text-light text-mini align-self-start mt-4 ms-3 d-flex flex-column">
            <p className="align-self-start">Version: <strong>{window.APP_VERSION}</strong></p>
            <p className="align-self-start">Logged in as: <strong>{usernameCtx}</strong></p>
            <p className="align-self-start">Role: <strong>{roleCtx}</strong></p>
        </div>
    </div>
  )

};
export default SideBar;
