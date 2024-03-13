import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
  },
});

export default store;
