import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const gameSlice = createSlice({
    name: "game",
    initialState: initialState,
    reducers: {
        resetGame: () => initialState
    }
})

export const { resetGame } = gameSlice.actions;
export default gameSlice.reducer