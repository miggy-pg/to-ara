import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  accommodations: [],
};

export const accommodationSlice = createSlice({
  name: "accomodations",
  initialState,
  reducers: {
    setAccommodations: (state, action) => {
      state.accommodations = action.payload;
    },
    SUCCESS_CREATE_ACCOMMODATION: () => {
      toast.success("You have successfully created the accommodation!");
    },
    FAILED_CREATE_ACCOMMODATION: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_DELETE_ACCOMMODATION: () => {
      toast.success("Selected accommodation has been deleted!");
    },
    FAILED_DELETE_ACCOMMODATION: (state, action) => {
      toast.error(action.payload);
    },
    SUCCESS_UPDATED_ACCOMMODATION: () => {
      toast.success("Accommodation has been updated successfully!");
    },
    FAILED_UPDATED_ACCOMMODATION: (state, action) => {
      toast.error(action.payload);
    },
  },
});

export const {
  setAccommodations,
  SUCCESS_CREATE_ACCOMMODATION,
  FAILED_CREATE_ACCOMMODATION,
  SUCCESS_DELETE_ACCOMMODATION,
  FAILED_DELETE_ACCOMMODATION,
  SUCCESS_UPDATED_ACCOMMODATION,
  FAILED_UPDATED_ACCOMMODATION,
} = accommodationSlice.actions;

export default accommodationSlice.reducer;
