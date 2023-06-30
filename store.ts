import { configureStore } from "@reduxjs/toolkit";
import petsReducer from "./slices/petsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    pets: petsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;