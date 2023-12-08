import React, { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar.js';
import Header from '../components/Header.js';
import api from '../ApiConfig.js';

const getListjjItems = async () => {
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

const getListjjCategories = async () => {
    const response = api.get('/api/category/categories_by_userid')
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

const BasePage = ({component: PageComponent}) => {
    const [itemsData, setItemsData] = useState([]);
    useEffect(() => {
        getListjjItems().then(items => setItemsData(items))
    }, []);

    const [categoriesData, setCategoriesData] = useState([]);
    useEffect(() => {
        getListjjCategories().then(categories => setCategoriesData(categories))
    }, []);

    const refresh = () => {
        getListjjItems().then(items => setItemsData(items));
        getListjjCategories().then(categories => setCategoriesData(categories));
    };

    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const contentClass = sidebarOpen ? "content sidebarOpen" : "content";

    return(
        <div>
            <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} categoriesData={categoriesData} refresh={refresh} />
            <div className={contentClass}>
                <Header onClick={handleViewSidebar} />
                <PageComponent refresh={refresh} itemsData={itemsData} setItemsData={setItemsData} categoriesData={categoriesData} />
            </div>
        </div>
    );
}

export default BasePage;