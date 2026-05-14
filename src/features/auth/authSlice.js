import { createSlice } from "@reduxjs/toolkit";

const loadAuthData = () => {
  if (typeof window !== "undefined") {
    return {
      user: JSON.parse(localStorage.getItem("user")) || null,
      isAuth: localStorage.getItem("isAuth") === "true",
    };
  }
  return { user: null, isAuth: false };
};

const initialState = loadAuthData();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuth", "true");
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;