import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddNoteForm from "../components/AddNoteForm";

const SideBar = props => {
  const sidebarClass = props.isOpen ? "sidebar sidebarOpen" : "sidebar";
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
                        <AddNoteForm  />
                </div>
            </div>

        </div>
    </div>
  );
};
export default SideBar;
