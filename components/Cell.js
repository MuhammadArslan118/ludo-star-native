import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import Pile from './Pile'

const Cell = ({ color, index, id }) => {
    return (
        <View style={styles.container}>
            {/* <Pile cell={true}
                player={2}
                onPress={() => { }}
                pieceId={2}
                color={Colors.green}
            /> */}
            <Text>{id}</Text>
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