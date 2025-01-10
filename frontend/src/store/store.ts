import { configureStore } from "@reduxjs/toolkit";
import pdfReducer from "../store/pdfSlice";

export const store = configureStore({
  reducer: {
    courses: pdfReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
