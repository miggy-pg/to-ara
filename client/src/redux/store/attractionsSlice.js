import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  attractions: [],
};

export const attractionsSlice = createSlice({
  name: "attractions",
  initialState,
  reducers: {
    setAttractions: (state, action) => {
      state.attractions = action.payload;
    },
    SUCCESS_CREATE_ATTRACTION: () => {
      toast.success("You have successfully created the attraction!");
    },
    FAILED_CREATE_ATTRACTION: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_DELETE_ATTRACTION: () => {
      toast.success("Selected attraction has been deleted!");
    },
    FAILED_DELETE_ATTRACTION: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_UPDATED_ATTRACTION: () => {
      toast.success("Attraction has been updated successfully!");
    },
    FAILED_UPDATED_ATTRACTION: (state, action) => {
      toast.error(action.payload);
    },
  },
});

export const {
  setAttractions,
  SUCCESS_DELETE_ATTRACTION,
  FAILED_DELETE_ATTRACTION,
  SUCCESS_CREATE_ATTRACTION,
  FAILED_CREATE_ATTRACTION,
  FAILED_UPDATED_ATTRACTION,
  SUCCESS_UPDATED_ATTRACTION,
} = attractionsSlice.actions;

export default attractionsSlice.reducer;
