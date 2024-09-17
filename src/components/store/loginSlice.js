import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk for login
export const loginCall = createAsyncThunk('login', async (user) => {
    const res = await axios.post('http://localhost:8080/api/v1/login',user);
    return res.data;
});

export const refreshApiCall = createAsyncThunk('refreshApiCall', async () => {
    const res = await axios.get('http://localhost:8080/api/v1/refreshApi');
    return res.data;
});


export const logoutApiCall = createAsyncThunk('logout', async (user) => {
    const res = await axios.post('http://localhost:8080/api/v1/logout',user);
    return res.data;
});


const loginSlice = createSlice({
    name: 'login',
    initialState:{
        user: [],
    },
    extraReducers: (builder) => {
        builder.addCase(loginCall.fulfilled, (state, action) => {
            // return action.payload;
            state.user = action.payload.data.user;
        });
        builder.addCase(refreshApiCall.fulfilled, (state, action) => {
            // return action.payload;
            state.user = action.payload.data.user;
        });
        builder.addCase(logoutApiCall.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default loginSlice.reducer;
