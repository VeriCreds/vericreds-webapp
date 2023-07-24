import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

export const nftSlice = createSlice({
    name: "nft",
    initialState: {
        value: {
            name: null,
            format: null,
            image: null,
            status: null,
            category: null
        }
    },
    reducers: {
        setNftAttributes: (state, action) => {
            state.value = action.payload;
        },
        clearNft: state => {
            state.value = {
                name: null,
                format: null,
                image: null,
                status: null,
                category: null
            };
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

export const { setNftAttributes, clearNft } = nftSlice.actions

export default nftSlice.reducer;
