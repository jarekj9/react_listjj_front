import React, { useCallback, useState } from 'react';
import AppContext from './AppContext';
import { useCookies } from 'react-cookie';

const AppProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['recentCategoryId']);
  const [categoryIdCtx, setCategoryIdCtx] = useState(cookies.recentCategoryId);
  const [loadingCtx, setLoadingCtx] = useState(false);
  const cookieOptions = {
    expires: new Date(Date.now() + 86400000000),
    path: '/',
  };
  const updateCategoryIdCtx = useCallback((categoryIdCtx) => {
    setCategoryIdCtx(categoryIdCtx);
    setCookie('recentCategoryId', categoryIdCtx, cookieOptions);
  });

  const updateLoadingCtx = (loadingCtx) => {
    setLoadingCtx(loadingCtx);
  };

  return (
    <AppContext.Provider value={{ categoryIdCtx, updateCategoryIdCtx, loadingCtx, updateLoadingCtx }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;