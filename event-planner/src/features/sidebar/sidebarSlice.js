import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
};

export const userSlice = createSlice({
  name: 'user', 
  initialState, 
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    selectUser: (state) => state.user,
  },
});

export const { setUser, clearUser, selectUser, toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
