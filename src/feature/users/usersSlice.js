import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userUrl = 'https://jsonplaceholder.typicode.com/users'

const initialState = []


export const fetchUsers = createAsyncThunk('posts/fetchUsers',async()=>{
    try{
        const response = await axios.get(userUrl);
        return response.data

    }catch(err){
        return err.message
    }
})


const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            return action.payload
        })
    }
})

export const selectAllUsers = (state) => state.users
export const selectUserById = (state,userId) => state.users.find(user => user.id === userId)

export default userSlice.reducer