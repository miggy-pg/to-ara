import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  festivals: [],
};

export const festivalSlice = createSlice({
  name: "festivals",
  initialState,
  reducers: {
    setFestivals: (state, action) => {
      state.festivals = action.payload;
    },
    SUCCESS_CREATE_FESTIVAL: () => {
      toast.success("You have successfully created the festival!");
    },
    FAILED_CREATE_FESTIVAL: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_DELETE_FESTIVAL: () => {
      toast.success("Selected festival has been deleted!");
    },
    FAILED_DELETE_FESTIVAL: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_UPDATED_FESTIVAL: () => {
      toast.success("Festival has been updated successfully!");
    },
    FAILED_UPDATED_FESTIVAL: (state, action) => {
      toast.error(action.payload);
    },
  },
});

export const {
  setFestivals,
  SUCCESS_CREATE_FESTIVAL,
  FAILED_CREATE_FESTIVAL,
  SUCCESS_DELETE_FESTIVAL,
  FAILED_DELETE_FESTIVAL,
  SUCCESS_UPDATED_FESTIVAL,
  FAILED_UPDATED_FESTIVAL,
} = festivalSlice.actions;

export default festivalSlice.reducer;
