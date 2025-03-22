import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./slice/auth";
import AddressPage from "./slice/AddressPage";
const store = configureStore({
    reducer : {
        auth : authSlice,
        addresPage : AddressPage
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store