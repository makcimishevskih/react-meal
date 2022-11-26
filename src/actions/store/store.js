import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import mealReducer from "@reducers/mealReducer";

const store = configureStore({
  reducer: {
    mealReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export default store;
