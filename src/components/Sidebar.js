import React from "react";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddNoteForm from "../components/AddNoteForm";
import AddCategoryForm from "../components/AddCategoryForm";

const SideBar = props => {
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
        <div className="text-light text-mini align-self-start mt-4 ms-3">
            <p>Version: {window.APP_VERSION}</p>
        </div>
    </div>
  )

};
export default SideBar;
