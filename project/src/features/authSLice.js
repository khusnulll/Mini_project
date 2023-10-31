import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  target: null,
  totalPrice: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setTarget: (state, action) => {
      state.target = action.payload;
      state.isAuthenticated = true;
    },
    deleteTarget: (state) => {
      state.target = null;
    },
  },
});

export const { setUser, setTarget, deleteTarget, setTotalPrice } = authSlice.actions;
export default authSlice.reducer;
