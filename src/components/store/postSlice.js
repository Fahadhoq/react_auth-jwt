import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const posts = createAsyncThunk('posts', async (user) => {
    const res = await axios.get('post/list',user);
    return res.data;
});

export const iamge = createAsyncThunk('iamge', async (user) => {
    const res = await axios.post('post/image', user);
    return res.data; // Returns the successful response
});



const postSlice = createSlice({
    name: 'posts',
    initialState:{
        user: [],
    },
    extraReducers: (builder) => {
        builder.addCase(posts.fulfilled, (state, action) => {
            return action.payload; // Set the state to the payload of the fulfilled action
        });
    },
    extraReducers: (builder) => {
        builder.addCase(Image.fulfilled, (state, action) => {
            return action.payload; // Set the state to the payload of the fulfilled action
        });
    },
});

export default postSlice.reducer;
