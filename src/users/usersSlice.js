import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    isLoading: true,
    error:'',
};

const theURL = 'https://randomuser.me/api/?results=5';

const getUsers = createAsyncThunk(
    'users/getUsersInfo',
    async (thunkAPI) => {
        try{
            const response = await axios(theURL);
            return response.data.results;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);

const usersSlice = createSlice({
    name: 'Users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => ({
        ...state,
        users: action.payload,
        isLoading: true,    
        }))
        builder.addCase(getUsers.fulfilled, (state, action) => ({
            ...state,
            users: action.payload,
            isLoading: false,

        }))
        builder.addCase(getUsers.rejected, (state, action) => ({
            ...state,
            users: action.payload,
            isLoading: false,
            error: action.error.message,
        }))
    },
});
export { getUsers } ;
export default usersSlice.reducer;