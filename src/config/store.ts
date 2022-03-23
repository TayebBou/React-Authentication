import { configureStore } from "@reduxjs/toolkit";
import authReducer from './stateSlices/authSlice';

const store = configureStore({
    reducer : {
        auth : authReducer
    }
});

export default store;