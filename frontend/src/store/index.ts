import { configureStore } from "@reduxjs/toolkit";
import AddressPage from "./slice/AddressPage";
import authSlice from "./slice/auth";
const store = configureStore({
    reducer : {
        auth : authSlice,
        addresPage : AddressPage
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
