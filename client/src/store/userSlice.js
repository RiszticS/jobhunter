import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  fullname: null,
  role: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.role = action.payload.role;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.id = null;
      state.email = null;
      state.fullname = null;
      state.role = null;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
