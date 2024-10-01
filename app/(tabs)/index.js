import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

import Wrapper from "@/components/Wrapper";
import MenuIcon from "../../assets/images/menu.png";
import { deviceHeight, deviceWidth } from "@/constants/Scalling";
import Dice from "@/components/Dice";
import VerticalPath from "@/components/VerticalPath";
import HorizontalPath from "@/components/HorizontalPath";
import FourTriagles from "@/components/FourTriagles";
import Pocket from "@/components/Pocket";
import { Colors } from "@/constants/Colors";
import { Plot1Data, Plot2Data, Plot3Data, Plot4Data } from "@/helpers/PlotData";
import { useSelector } from "react-redux";
import { selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from "@/redux/reducers/gameSelector";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import StarGame from "@/assets/images/start.png"

export default function HomeScreen() {
  const isFocused = useIsFocused()
  const player1 = useSelector(selectPlayer1)
  const player2 = useSelector(selectPlayer2)
  const player3 = useSelector(selectPlayer3)
  const player4 = useSelector(selectPlayer4)
  const isDiceTouch = useSelector(selectDiceTouch)
  const winner = useSelector((state) => state.game.winner)

  const [showStarImage, setShowStarImage] = useState(false)
  const [menueVisible, setIsMenueVisible] = useState(false)
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (isFocused) {
      setShowStarImage(true)
      const blinkAnimation = Animated.loop(Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0, duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1, duration: 500,
          useNativeDriver: true
        })
      ])

      );
      blinkAnimation.start()
      const timout = setTimeout(() => {
        setShowStarImage(false)
      }, 2500);
      return () => {
        blinkAnimation.stop()
        clearTimeout(timout)
      }
    }
  }, [isFocused])

  return (
    <Wrapper>
      <TouchableOpacity style={{ position: "absolute", top: 60, left: 20 }}>
        <Image source={MenuIcon} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Dice color={Colors.green} player={2} data={player2} />
          <Dice color={Colors.yellow} rotate player={3} data={player3} />
        </View>

        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} data={player2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3} data={player3} />
          </View>

          <View style={styles.pathContainer}>
            <HorizontalPath cells={Plot1Data} color={Colors.green} />
            <FourTriagles />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>

          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} data={player1} />
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} data={player4} />
          </View>

        </View>

        <View style={styles.flexRow}>
          <Dice color={Colors.red} player={1} data={player1} />
          <Dice color={Colors.blue} rotate player={4} data={player4} />
        </View>
      </View>

      {showStarImage && <Animated.Image source={StarGame}
        style={{
          width: deviceWidth * 0.5,
          height: deviceHeight * 0.5,
          position: "absolute",
          opacity
        }}
      />}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    height: deviceHeight * 0.5,
    width: "100%",
    // backgroundColor: "red",
  },
  flexRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  ludoBoard: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'red'
  },
  plotContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
  pathContainer: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    justifyContent: "space-between",
    backgroundColor: "#1E5162"
  }
});
