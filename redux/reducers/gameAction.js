import { selectCurrentPositions, selectDiceNo } from "./gameSelector";
import { announceWinner, disableTouch, unfreezDice, updateFireWorks, updatePlayerChance, updatePlayerPieceValue } from "./gameSlice";
import { SafeSpots, StarSpots, startingPoints, turningPoints, victoryStart } from "../../helpers/PlotData";
import { playSound } from "../../helpers/SoundUtility";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
export const handleForwardThunk = (playerNo, id, pos) => async (dispatch, getState) => {
    const state = getState()
    const plottedPieces = selectCurrentPositions(state)
    const diceNo = selectDiceNo(state)

    let alpha = playerNo == 1 ? "A" : playerNo == 2 ? "B" : playerNo == 3 ? "C" : "D";
    const piecesAtPosition = plottedPieces?.filter(item => item.pos === pos);
    const piece = piecesAtPosition[piecesAtPosition.findeIndex(item => item.id[0] == alpha)]

    dispatch(disableTouch())

    let finalPath = piece.pos;
    const beforePlayerPiece = state.game[`player${playerNo}`].find(item => item.id == id)
    let travelCount = beforePlayerPiece.travelCount;
    for (let i = 0; i < diceNo; i++) {
        const updatedPosition = getState()
        const playerPiece = updatedPosition?.game[`player${playerNo}`].find(item => item.id == id);

        let path = playerPiece.pos + 1
        if (turningPoints.includes(path) && turningPoints[playerNo - 1] == path) {
            path = victoryStart[playerNo - 1]
        }
        if (path == 53) {
            path = 1
        }
        finalPath = path;
        travelCount += 1
        dispatch(updatePlayerPieceValue({
            playerNo: `player${playerNo}`,
            pieceId: playerPiece.id,
            pos: path,
            travelCount: travelCount
        }))
        playSound("pile_move")
        await delay(200)
    }

    const updatedState = getState();
    const updatedPlottedPiecs = selectCurrentPositions(updatedState);
    // check coliding
    const finalPlot = updatedPlottedPiecs?.filter(item => item.pos === finalPath);
    const ids = finalPlot.map(item => item.id[0]);
    const uniqueIds = new Set(ids);
    const aredifferentIds = uniqueIds.size > 1
    if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
        playSound("safe_spot")
    }
    if (aredifferentIds && !SafeSpots.includes(finalPlot[0].pos) && !SafeSpots.includes(finalPlot[0].pos)) {
        const enemyPiece = finalPlot.find(piece => piece.id[0] !== id[0]);
        const enemyId = enemyPiece.id[0];
        let no = enemyId == "A" ? 1 : enemyId == "B" ? 2 : enemyId == "C" ? 3 : 4;

        let backwordPath = startingPoints[no - 1];
        let i = enemyPiece.pos;
        playSound("collide");

        while (1 !== backwordPath) {
            dispatch(updatePlayerPieceValue({
                playerNo: `player${no}`,
                pieceId: enemyId.id,
                pos: i,
                travelCount: 0
            }))
            await delay(0.4)
            i--;
            if (i == 0) {
                i = 52
            }
        }

        dispatch(updatePlayerPieceValue({
            playerNo: `player${no}`,
            pieceId: enemyId.id,
            pos: i,
            travelCount: 0
        }))
        disableTouch(unfreezDice())
        return
    }

    if (diceNo == 6 || travelCount == 57) {
        dispatch(updatePlayerChance({ chancePlayer: playerNo }))
        if (travelCount == 57) {
            // check winning criteria
            playSound("home_win")
            const finalPlayerState = getState()
            const playerAllPieces = finalPlayerState.game[`player${playerNo}`]
            if (checkWinningCriteria(playerAllPieces)) {
                dispatch(announceWinner(playerNo))
                playSound("cheer")
                return;
            }

            dispatch(updateFireWorks(true))
            dispatch(unfreezDice())
            return;
        }
    } else {
        let chancePlayer = playerNo + 1;
        if (chancePlayer > 4) {
            chancePlayer = 1
        }
        dispatch(updatePlayerChance({ chancePlayer }))
    }
}

function checkWinningCriteria(pieces) {
    for (let piece of pieces) {
        if (piece.travelCount < 57) {
            return false
        }
        return true
    }
}