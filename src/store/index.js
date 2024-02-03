import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./coin-slice";

const store = configureStore({
    reducer: {coin: coinSlice.reducer}
});

export default store;