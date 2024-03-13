import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false, 
};

export const sidebarSlice = createSlice({
  name: 'sidebar', 
  initialState, 
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    }, 

    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    selectUser: (state) => state.user,
  },
});

export const { setUser, clearUser, selectUser, toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
