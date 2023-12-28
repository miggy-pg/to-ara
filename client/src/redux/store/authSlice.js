import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  }

  return false;
};

const userRoleFromLocalStorage = () => {
  const isAdmin = localStorage.getItem("isAdmin");

  if (isAdmin && JSON.parse(isAdmin) === true) {
    return true;
  }

  return false;
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  isAdmin: userRoleFromLocalStorage(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true;
      toast.success("Login successful. Dive into new destinations!");
    },
    unauthenticateUser: (state) => {
      state.isAuth = false;
      state.isAdmin = false;
    },
    setUserRole: (state, action) => {
      state.isAdmin = action.payload;
    },
    FAILED_LOGIN_USER: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_CREATE_USER: () => {
      toast.success("You have successfully created the user!");
    },
    FAILED_CREATE_USER: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_DELETE_USER: () => {
      toast.success("User has been deleted!");
    },
    FAILED_DELETE_USER: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_UPDATED_USER: () => {
      toast.success("User has been updated successfully!");
    },
    FAILED_UPDATED_USER: (state, action) => {
      toast.error(action.payload);
    },
  },
});

export const {
  authenticateUser,
  unauthenticateUser,
  setUserRole,
  SUCCESS_DELETE_USER,
  FAILED_DELETE_USER,
  SUCCESS_CREATE_USER,
  FAILED_CREATE_USER,
  FAILED_UPDATED_USER,
  SUCCESS_UPDATED_USER,
  FAILED_LOGIN_USER,
} = authSlice.actions;

export default authSlice.reducer;
