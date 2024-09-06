import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import FireWorks from '@/assets/animation/firework.json'
import LottieView from 'lottie-react-native'
import { Polygon, Svg } from 'react-native-svg'

const FourTriagles = () => {
    const size = 300
    const [blast, setBlast] = useState(false)

    return (
        <View style={styles.mainContainer}>
            {blast &&
                <LottieView
                    source={FireWorks}
                    autoPlay
                    loop
                    speed={1}
                    hardwareAccelerationAndroid
                    style={styles.lotiView}
                />
            }
            <Svg height={size} width={size - 5}>
                <Polygon
                    points={`0,0 ${size / 2.08}, ${size / 1.91} ${size},0`}
                    fill={Colors.yellow}
                />
                <Polygon
                    points={`${size}, 0 ${size}, ${size} ${size / 2},${size / 2}`}
                    fill={Colors.blue}
                />
                <Polygon
                    points={`0,${size} ${size / 2.01}, ${size / 2.001} ${size},${size}`}
                    fill={Colors.red}
                />
                <Polygon
                    points={`0, 0 ${size / 2.05}, ${size / 2} 0, ${size}`}
                    fill={Colors.green}
                />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.8,
        width: "20%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#fff",
        borderColor: Colors.borderColor
    },
    lotiView: {
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 1
    }
})

export default FourTriagles