import React, { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar.js';
import Header from '../components/Header.js';
import api from '../ApiConfig';

const listjjItems = async () => {
    const response = api.get('/api/item/items_by_userid')
        .then(({data }) => {
            console.log(data);
            return data;
        })
        .catch(error => {
            if (error.response.status === 401) {
              const reason = error.response.data;
              const headers = error.response.headers;
              console.log(`Unauthorized: ${reason}`);
              console.log(`Headers: ${JSON.stringify(headers)}`);
            } 
            else {
                console.log(error);
            }
        });
    return response;
};



function HomePage() {
    const [itemsData, setItemsData] = useState([]);
    useEffect(() => {
        listjjItems().then(items => setItemsData(items))
    }, []);

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const contentClass = sidebarOpen ? "content sidebarOpen" : "content";

    const OnCheckboxClick = (id) => {
        const updatedItems = itemsData.map(item => {
            if (item.id === id) {
                item.active = !item.active;
            }
            return item;
        });
        setItemsData(updatedItems);
    }

    return(
        <div>
            <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
            <div className={contentClass}>
                <Header onClick={handleViewSidebar} />
                <h1>Home Page</h1>
                {
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsData && itemsData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.value}</td>
                                    <td><input type="checkbox" checked={item.active} onChange={(e) => OnCheckboxClick(item.id)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default HomePage;