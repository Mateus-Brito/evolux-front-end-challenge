import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "@reducers/index";

const store = configureStore({
    reducer: searchReducer
});

export type RootState = ReturnType<typeof searchReducer>
export type AppStore = ReturnType<typeof configureStore>
export type AppDispatch = AppStore['dispatch']

export default store;

