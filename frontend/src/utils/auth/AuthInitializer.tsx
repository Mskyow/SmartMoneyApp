import { useEffect } from 'react';
import { useAppDispatch } from '../hook'; // Assuming hook.ts is in the parent directory
//import { initializeAuth } from './ slice/auth'; // Assuming authSlice is in the slice directory

// This component will handle the initial state loading from localStorage
const AuthInitializer: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // The initial state logic is now handled within the authSlice's getInitialState
        // This effect is more for ensuring the slice is loaded and potentially
        // dispatching if there's any other initialization logic needed after store creation.
        // However, with the current setup, getInitialState does the job on store creation.

        // If you had asynchronous initialization (e.g., checking a token with a backend),
        // you would do that here and then dispatch login or logout based on the result.

        // For the current setup, the state is already initialized by getInitialState
        // when the store is configured. We can optionally dispatch initializeAuth
        // here if we wanted to explicitly signal initialization completion, but it's not strictly necessary
        // for the localStorage loading part.

        // Example if you needed to dispatch based on localStorage explicitly after mount:
        // const userJson = localStorage.getItem('user');
        // if (userJson) {
        //     try {
        //         const user = JSON.parse(userJson);
        //         dispatch(initializeAuth(user));
        //     } catch (error) {
        //         console.error("Failed to parse user from localStorage in AuthInitializer:", error);
        //         dispatch(initializeAuth(null)); // Clear state if localStorage is invalid
        //     }
        // } else {
        //      dispatch(initializeAuth(null)); // Ensure state is not logged in if no localStorage data
        // }

    }, [dispatch]); // Depend on dispatch

    // This component doesn't render anything
    return null;
};

export default AuthInitializer;
