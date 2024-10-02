import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import Pile from "@/components/Pile"
import { useDispatch } from 'react-redux';
import { unfreezDice, updatePlayerPieceValue } from '@/redux/reducers/gameSlice';
import { startingPoints } from '@/helpers/PlotData';

const Pocket = React.memo(({ color, player, data }) => {
    const dispatch = useDispatch()
    const handlePress = async (value) => {
        let playerNo = value?.id[0]
        switch (playerNo) {
            case "A":
                playerNo = "player1"
                break;
            case "B":
                playerNo = "player2"
                break;
            case "C":
                playerNo = "player3"
                break;
            case "D":
                playerNo = "player4"
                break;

        }

        dispatch(updatePlayerPieceValue({
            playerNo: playerNo,
            pieceId: value.id,
            pos: startingPoints[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
            travelCount: 1
        }))

        dispatch(unfreezDice())
    }
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <View style={styles.childFrame}>
                <View style={styles.flexRow}>
                    <Plot pieceNo={0} data={data} onPress={handlePress} player={player} color={color} />
                    <Plot pieceNo={1} data={data} onPress={handlePress} player={player} color={color} />
                </View>
                <View style={[styles.flexRow, { marginTop: 18 }]}>
                    <Plot pieceNo={2} data={data} onPress={handlePress} player={player} color={color} />
                    <Plot pieceNo={3} data={data} onPress={handlePress} player={player} color={color} />
                </View>
            </View>
        </View>
    )
})

const Plot = ({ pieceNo, player, color, data, onPress }) => {
    return (
        <View style={[styles.plot, { backgroundColor: color }]}>
            {
                data && data[pieceNo]?.pos === 0 && (
                    <Pile
                        color={color}
                        player={player}
                        onPress={() => onPress(data[pieceNo])}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '100%',
    },
    childFrame: {
        backgroundColor: 'white',
        width: '70%',
        height: '70%',
        borderColor: Colors.borderColor,
        padding: 15,
        borderWidth: 0.4,
    },
    flexRow: {
        justifyContent: "space-between",
        alignItems: 'center',
        width: '100%',
        height: '40%',
        flexDirection: 'row',
    },
    plot: {
        height: "80%",
        width: "36%",
        borderRadius: 120
    }
});
export default Pocket