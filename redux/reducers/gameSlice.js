import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const gameSlice = createSlice({
    name: "game",
    initialState: initialState,
    reducers: {
        resetGame: () => initialState,
        updateDiceNo: (state, action) => {
            state.diceNo = action.payload.diceNo;
            state.isDiceRolled = true;
        },
        enablePileSelection: (state, action) => {
            state.touchDiceBlock = true;
            state.pileSelectionPlayer = action.payload.playerNo
        },
        disableTouch: (state, action) => {
            state.touchDiceBlock = true;
            state.callSelectionPlayer = -1;
            state.pileSelectionPlayer = -1
        },
        unfreezDice: (state, action) => {
            state.touchDiceBlock = false;
            state.isDiceRolled = false;
        },
        updateFireWorks: (state, action) => {
            state.fireworks = action.payload;
        },
        announceWinner: (state, action) => {
            state.winner = action.payload;
        },
        updatePlayerChance: (state, action) => {
            state.chancePlayer = action.payload.chancePlayer;
            state.touchDiceBlock = false;
            state.isDiceRolled = false;
        },
        updatePlayerPieceValue: (state, action) => {

            const { playerNo, pieceId, pos, travelCount } = action.payload;
            const playerPieces = state[playerNo];
            const piece = playerPieces.find(p => p.id === pieceId)
            state.pileSelectionPlayer = -1;

            if (piece) {
                piece.pos = pos;
                piece.travelCount = travelCount;
                const currentPositionIndex = state.currentPositions.findIndex(p => p.id === pieceId);
                if (pos == 0) {
                    if (currentPositionIndex !== -1) {
                        state.currentPositions.splice(currentPositionIndex, 1)
                    }
                } else {
                    if (currentPositionIndex !== -1) {
                        state.currentPositions[currentPositionIndex] = {
                            id: pieceId,
                            pos
                        }
                    } else {
                        state.currentPositions.push({ id: pieceId, pos })
                    }
                }
            }

        }
    }
})

export const {
    resetGame,
    updateDiceNo,
    announceWinner,
    disableTouch,
    enablePileSelection,
    unfreezDice,
    updateFireWorks,
    updatePlayerChance,
    updatePlayerPieceValue
} = gameSlice.actions;
export default gameSlice.reducer