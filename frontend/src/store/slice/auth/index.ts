import { createSlice } from "@reduxjs/toolkit";

interface IAuthState  {
    user : IPublicUser,
    isLogged: boolean
}

interface IPublicUser {
    id : number | null,
    username : string,
    email : string,
    createdAt : string ,
    updatedAt : string,
    watchlist : [IWatchList]
}

interface IWatchList {
        id : number | null,
        account_address : string,
        account_name: string,
        profile_image: string,
        createdAt : string ,
        updatedAt : string,
        user: number | null
}

const initialState:IAuthState = {
    user : {
        id : null,
        username : '',
        email : '',
        createdAt : '' ,
        updatedAt : '',
        watchlist : [{
            id : null ,
            account_address : '',
            account_name: '',
            profile_image : '',
            createdAt : '' ,
            updatedAt : '',
            user: null
        }]
    },
    isLogged: false
    }
    export const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            login(state, action) {
                state.user = action.payload;
                // console.log(action.payload)
                state.isLogged = true;
                // console.log(state.user)
            },
            addToWatchlist(state, action) {
                state.user.watchlist.push(action.payload);
            }
        }
    });
   


export const {login,addToWatchlist} = authSlice.actions
export default authSlice.reducer