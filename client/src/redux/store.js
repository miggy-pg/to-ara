import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./store/authSlice";
import attractionsSlice from "./store/attractionsSlice";
import festivalSlice from "./store/festivalSlice";
import accommodationSlice from "./store/accommodationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    festival: festivalSlice,
    attraction: attractionsSlice,
    accommodation: accommodationSlice,
  },
});
