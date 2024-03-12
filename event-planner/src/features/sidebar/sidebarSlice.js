import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
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

export const { setUser, clearUser, selectUser } = userSlice.actions;

export default userSlice.reducer;