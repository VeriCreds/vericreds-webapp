import { configureStore } from '@reduxjs/toolkit';
import { nftSlice } from '@/features/nft/nftSlice';
import { tokenSlice} from "@/features/token/tokenSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
    reducer: {
        [nftSlice.name]: nftSlice.reducer,
        [tokenSlice.name]: tokenSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});

export const wrapper = createWrapper(makeStore);
