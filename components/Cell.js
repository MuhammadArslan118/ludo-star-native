import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { Colors } from '@/constants/Colors'
import Pile from './Pile'
import { ArrowSpots, SafeSpots, StarSpots } from '@/helpers/PlotData'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const Cell = ({ color, index, id }) => {
    const isSafeSpot = useMemo(() => SafeSpots.includes(id), [id])
    const isStarSpot = useMemo(() => StarSpots.includes(id), [id])
    const isArrowSpot = useMemo(() => ArrowSpots.includes(id), [id])

    return (
        <View style={[styles.container, {
            backgroundColor: isSafeSpot ? color : "white"
        }]}>
            {isStarSpot && <EvilIcons name="star" size={20} color="grey" />}
            {isArrowSpot && (
                <AntDesign
                    style={{ transform: [{ rotate: id === 38 ? "180deg" : id === 25 ? "90deg" : id === 51 ? "-90deg" : "0deg" }] }}
                    name="arrowright" size={20} color="black"
                />
            )}
            {/* <Pile cell={true}
                player={2}
                onPress={() => { }}
                pieceId={2}
                color={Colors.green}
            /> */}
            {/* <Text>{id}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.4,
        borderColor: Colors.borderColor,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    pieceContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        zIndex: 99
    }
})

export default Cell