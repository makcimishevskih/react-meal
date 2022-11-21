import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch,useSelector } from 'react-redux';
import mealReducer from "@reducers/mealReducer";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

const store = configureStore({
    reducer: {
        mealReducer,
    },
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: () => AppSelector = useSelector;

export default store;