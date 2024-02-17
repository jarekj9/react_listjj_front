import React from "react";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddNoteForm from "../components/AddNoteForm";
import AddCategoryForm from "../components/AddCategoryForm";
//import env from "react-dotenv";

const SideBar = props => {
    //const version = env.VERSION;
    const sidebarClass = props.isOpen ? "sidebar sidebarOpen" : "sidebar";
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
        {/* <div className="version">
            <p>Version: {version}</p>
        </div> */}
    </div>
  )

};
export default SideBar;
