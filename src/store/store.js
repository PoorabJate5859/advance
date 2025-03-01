import { configureStore } from "@reduxjs/toolkit";
import blogDataReducer from "../feature/blogSlice";

export const store = configureStore({
  reducer: {
    blogData: blogDataReducer,
  },
});