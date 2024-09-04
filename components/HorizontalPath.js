import { View, Text } from 'react-native'
import React from 'react'
import { useMemo } from 'react'
import Cell from '../components/Cell'


const HorizontalPath = ({ cells, color }) => {
    console.log(cells, color);

    const groupedCells = useMemo(() => {
        const groups = []
        for (let i = 0; i < cells.length; i += 6) {
            groups.push(cells.slice(i, i + 6))
        }
        return groups
    }, [cells])

    return (
        <View style={{ flexDirection: "row", alignItems: "center", width: "40%", height: "100%" }}>
            <View style={{ flexDirection: "column", width: "100%", height: "100%" }}>{
                groupedCells.map((group, groupIndex) => (
                    <View key={`groups=${groupIndex}`}
                        style={{ flexDirection: "row", width: "16.7%", height: "33.3%" }}
                    >
                        {group.map(id => {
                            return (
                                <Cell key={`cell=${id}`} id={id} color={color} />
                            )
                        })}
                    </View>
                ))
            }</View>
        </View>
    )
}

export default HorizontalPath