import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWatchList {
    id: number | null;
    account_address: string;
    account_name: string;
    profile_image: string;
    createdAt: string;
    updatedAt: string;
    user: number | null;
}

interface IPublicUser {
    id: number | null;
    username: string;
    email: string;
    telegramId: string;
    telegramNotify: boolean;
    emailNotify: boolean;
    createdAt: string;
    updatedAt: string;
    watchlist: IWatchList[]; // Changed to array
}

interface IAuthState {
    user: IPublicUser | null; // Allow user to be null initially
    isLogged: boolean;
}

// Helper function to get initial state from localStorage
const getInitialState = (): IAuthState => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
        try {
            const user: IPublicUser = JSON.parse(userJson);
            return {
                user,
                isLogged: true,
            };
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            // Clear invalid data from localStorage
            localStorage.removeItem('user');
            return {
                user: null,
                isLogged: false,
            };
        }
    }
    return {
        user: null, // Initial state user is null
        isLogged: false,
    };
};

const initialState: IAuthState = getInitialState();

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to handle user login
        login(state, action: PayloadAction<IPublicUser>) {
            state.user = action.payload;
            state.isLogged = true;
            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        // Action to handle user logout
        logout(state) {
            state.user = null;
            state.isLogged = false;
            // Remove user data from localStorage
            localStorage.removeItem('user');
        },
        // Action to add item to watchlist (assuming user is logged in)
        addToWatchlist(state, action: PayloadAction<IWatchList>) {
            if (state.user) {
                state.user.watchlist.push(action.payload);
                // Optionally update localStorage after adding to watchlist
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        // Action to initialize state from storage - this is handled by getInitialState
        // but we can keep it if needed for explicit dispatch
        initializeAuth(state, action: PayloadAction<IPublicUser | null>) {
             if (action.payload) {
                state.user = action.payload;
                state.isLogged = true;
             } else {
                state.user = null;
                state.isLogged = false;
             }
        }
    }
});

export const { login, logout, addToWatchlist, initializeAuth } = authSlice.actions; // Export initializeAuth
export default authSlice.reducer;
