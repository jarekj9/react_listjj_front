import React from "react";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddNoteForm from "../components/AddNoteForm";
import AddCategoryForm from "../components/AddCategoryForm";

const SideBar = props => {
    const sidebarClass = props.isOpen ? "sidebar sidebarOpen" : "sidebar";
    const location = useLocation();

  return (
    <div className={sidebarClass}>
        <div className="container">
            <div className="row">
                <div className="col">
                    <button onClick={props.toggleSidebar} className="btn btn-secondary sidebar-toggler">
                        <FontAwesomeIcon icon="bars" /> 
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col">
                        { (location.pathname === '/items' || location.pathname === '/') && 
                            <AddNoteForm refresh={props.refresh} categoriesData={props.categoriesData} itemsData={props.ItemsData}  /> }
                        { location.pathname === '/categories' && 
                            <AddCategoryForm refresh={props.refresh} categoriesData={props.categoriesData} itemsData={props.ItemsData}  /> }
                </div>
            </div>

        </div>
    </div>
  );
};
export default SideBar;
