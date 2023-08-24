import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value: null
    },
    reducers: {
        setTokenAttributes: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.nft,
            };
        });
    }
});

export const { setTokenAttributes } = tokenSlice.actions

export default tokenSlice.reducer;
