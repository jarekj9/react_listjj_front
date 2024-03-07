import React, { useState, useEffect, useContext, useRef } from 'react';
import SideBar from '../components/Sidebar.js';
import Header from '../components/Header.js';
import OutSideSidebarClick from '../components/OutsideSideBarClick.js';
import api from '../ApiConfig.js';
import AppContext from '../AppContext';
import { toast } from 'react-toastify'; 
import { jwtDecode } from "jwt-decode";

const BasePage = ({component: PageComponent}) => {
    
    const { categoryIdCtx, updateCategoryIdCtx, loadingCtx, updateLoadingCtx, usernameCtx, setUsernameCtx, setRoleCtx } = useContext(AppContext);
    const [itemsData, setItemsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [searchWords, setSearchWords] = useState('');

    const token = localStorage.getItem("token");
    const decodedJwt = jwtDecode(token);
    setUsernameCtx(decodedJwt.username);
    setRoleCtx(decodedJwt.role);

    useEffect(() => {
        refresh();
    }, [categoryIdCtx]);

    const refresh = async () => {
        updateLoadingCtx(true);
        await Promise.all([getListjjItems(), getListjjCategories()]).then(([items, categories]) => {
            setItemsData(items);
            setCategoriesData(categories);
            updateLoadingCtx(false);
        });
    };

    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const getListjjItems = async () => {
        const response = await api.get(`/api/item/items_by_filter?searchWords=${searchWords ?? ' '}&fromDateStr=${' '}&toDateStr=${' '}&categoryId=${categoryIdCtx}`)
            .then(({data }) => {
                return data;
            })
            .catch(error => {
                if (error?.response?.status === 401) {
                  const reason = error.response.data;
                  const headers = error.response.headers;
                  console.log(`Unauthorized: ${reason}`);
                  console.log(`Headers: ${JSON.stringify(headers)}`);
                } 
                else {
                    console.log(error);
                }
                toast.error('Error while fetching data.');
                return [];
            });
        return response;
    };
    
    const getListjjCategories = async () => {
        const response = await api.get('/api/category/categories_by_userid')
            .then(({data }) => {
                return data;
            })
            .catch(error => {
                if (error?.response?.status === 401) {
                  const reason = error.response.data;
                  const headers = error.response.headers;
                  console.log(`Unauthorized: ${reason}`);
                  console.log(`Headers: ${JSON.stringify(headers)}`);
                } 
                else {
                    console.log(error);
                }
                return [];
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
                {loadingCtx && <div className="spinner-border" role="status"></div>}
                <PageComponent refresh={refresh} setSearchWords={setSearchWords} categoriesData={categoriesData} itemsData={itemsData} setItemsData={setItemsData} />
            </div>
        </div>
    );
}

export default BasePage;