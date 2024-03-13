import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import sidebarReducer from '../features/sidebar/sidebarSlice';
import userReducer from '../features/user/userSlice';
=======
import { sidebarReducer } from './sidebarSlice'; // Updated import
import { userReducer } from './userSlice'; // Updated import

>>>>>>> 6ba0557 (made changes)
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
  },
});

export default store;
