import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk for singup
export const registerApiCall = createAsyncThunk('registerApiCall', async (user) => {
        const res = await axios.post('register', user);
        return res.data; // Returns the successful response
});

// Async thunk for login
export const loginCall = createAsyncThunk('login', async (user) => {
    const res = await axios.post('login',user);
    return res.data;
});

export const refreshApiCall = createAsyncThunk('refreshApiCall', async () => {
    const res = await axios.get('refreshApi');
    return res.data;
});


export const logoutApiCall = createAsyncThunk('logout', async (user) => {
    const res = await axios.post('logout',user);
    return res.data;
});


const loginSlice = createSlice({
    name: 'login',
    initialState:{
        user: [],
        error: null,  // To store error messages
    },
    extraReducers: (builder) => {
        builder.addCase(registerApiCall.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(registerApiCall.rejected, (state, action) => {
            state.error = action.error.message;
        });
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
