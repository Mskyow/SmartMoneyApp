import { createSlice } from "@reduxjs/toolkit";

interface IAuthState  {
    user : IPublicUser,
    isLogged: boolean
}

interface IPublicUser {
    id : number | null,
    userName : string,
    email : string,
    createdAt : string ,
    updatedAt : string,
    watchlist : [IWatchList]
}

interface IWatchList {
        id : number | null,
        name : string,
        assetId: string,
        createdAt : string ,
        updatedAt : string,
        user: number | null
}

const initialState:IAuthState = {
    user : {
        id : null,
        userName : '',
        email : '',
        createdAt : '' ,
        updatedAt : '',
        watchlist : [{
            id : null ,
            name : '',
            assetId: '',
            createdAt : '' ,
            updatedAt : '',
            user: null
        }]
    },
    isLogged: false
    }



export const authSlice = createSlice({
    name : "auth",
    initialState ,
    reducers : {
        login(state, action){
            state.user = action.payload
            state.isLogged = true    
    }}
})


// export const addAddressSlice = createSlice({
//     name : "watchlist",
//     user,
//     reducers : {
//         addAddress(state, action){
//             state.user = action.payload
//             state.isLogged = true    
//     }}
// })


export const {login} = authSlice.actions
export default authSlice.reducer