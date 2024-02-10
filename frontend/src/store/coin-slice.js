// coin-slice.js
import { createSlice } from "@reduxjs/toolkit";

const coinSlice = createSlice({
    name: 'coin',
    initialState: { coins: [], favCoins: [], favCoinsVisible: false, isLogged: false },
    reducers: {
        setCoins(state, action) {
            state.coins = action.payload;
        },
        setFavCoins(state, action) {
            state.favCoins = action.payload;
        },
        favCoinsVisible(state) {
            state.favCoinsVisible = true;
        },
        favCoinsUnvisible(state) {
            state.favCoinsVisible = false;
        },
        toggleFavCoinsVisibility(state) {
            state.favCoinsVisible = !state.favCoinsVisible;
        },
        saveLikedCoin(state, action) {
            const coinId = action.payload;
            if (!state.favCoins.includes(coinId)) {
                state.favCoins.push(coinId);
            }
        },
        toogleIsLogged(state) {
            state.isLogged = true;
        },
        toogleIsLogout(state){
            state.isLogged = false;
        }
        
    },
});

export const coinActions = coinSlice.actions;

export default coinSlice;
