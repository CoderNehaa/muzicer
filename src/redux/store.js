import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { musicReducer } from "./reducers/musicReducer";

export const store = configureStore({
    reducer:{
        userReducer,
        musicReducer
    }
})

