import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
  };

export const store = configureStore({
    reducer: loginState,
  })

function loginState(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        isLoggedIn: false,
      };
    default:
      return state
  }
}
window.store = store;