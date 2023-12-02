import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddNoteForm from "../components/AddNoteForm";

const SideBar = props => {
  const sidebarClass = props.isOpen ? "sidebar sidebarOpen" : "sidebar";
  return (
    <div className={sidebarClass}>
        <div className="container">
            <div className="row">
                <div className="col align-content-end">
                    <button onClick={props.toggleSidebar} className="btn btn-secondary sidebar-toggle mt-2">
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
