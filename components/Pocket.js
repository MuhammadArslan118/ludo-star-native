import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import Pile from "@/components/Pile"

const Pocket = React.memo(({ color, player }) => {
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <View style={styles.childFrame}>
                <View style={styles.flexRow}>
                    <Plot pieceNo={0} player={player} color={color} />
                    <Plot pieceNo={1} player={player} color={color} />
                </View>
                <View style={[styles.flexRow, { marginTop: 18 }]}>
                    <Plot pieceNo={0} player={player} color={color} />
                    <Plot pieceNo={1} player={player} color={color} />
                </View>
            </View>
        </View>
    )
})

const Plot = ({ pieceNo, player, color }) => {
    return (
        <View style={[styles.plot, { backgroundColor: color }]}>
            <Pile color={color} />
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