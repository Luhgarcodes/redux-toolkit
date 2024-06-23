import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../feature/counter/counterSlice";
import postReducer from "../feature/post/postSlice";
import usersReducer from "../feature/users/usersSlice";

export const store = configureStore({
    reducer:{
        // counter:counterReducer
        posts:postReducer,
        users:usersReducer,
    }
})