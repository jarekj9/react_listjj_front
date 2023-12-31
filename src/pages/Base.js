import React, { useState, useEffect, useContext, useRef } from 'react';
import SideBar from '../components/Sidebar.js';
import Header from '../components/Header.js';
import OutSideSidebarClick from '../components/OutsideSideBarClick.js';
import api from '../ApiConfig.js';
import AppContext from '../AppContext';

const BasePage = ({component: PageComponent}) => {
    const { categoryIdCtx, updateCategoryIdCtx } = useContext(AppContext);
    const [itemsData, setItemsData] = useState([]);
    const [searchWords, setSearchWords] = useState('');
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

    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const getListjjItems = async () => {
        const response = api.get(`/api/item/items_by_filter?searchWords=${searchWords ?? ' '}&fromDateStr=${' '}&toDateStr=${' '}&categoryId=${categoryIdCtx}`)
            .then(({data }) => {
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


    const contentClass = sidebarOpen ? "content sidebarOpen" : "content";
    const sideBarRef = useRef(null);
    function closeSideBarOnMobile() {
        if(window.innerWidth < 768) {
            setSideBarOpen(true); //reversed logic on mobile
        }
    }
    const outsideSidebarClick = OutSideSidebarClick(sideBarRef, closeSideBarOnMobile);
    
    return(
        <div>
            <Header toggleSidebar={handleViewSidebar}/>
            <div ref={sideBarRef}>
                <SideBar isOpen={sidebarOpen} setSideBarOpen={setSideBarOpen} categoriesData={categoriesData} refresh={refresh} />
            </div>

            <div className={contentClass}>
                <PageComponent refresh={refresh} setSearchWords={setSearchWords} categoriesData={categoriesData} itemsData={itemsData} setItemsData={setItemsData} />
            </div>
        </div>
    );
}

export default BasePage;