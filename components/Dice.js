import { BackgroundImage } from "@/helpers/GetIcon";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from 'lottie-react-native';
import DiceRoll from "@/assets/animation/diceroll.json"
import { playSound } from "@/helpers/SoundUtility"

import Arrow from "@/assets/images/arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayerChance, selectDiceNo, selectDiceRolled } from "@/redux/reducers/gameSelector";
import { enablePileSelection, updateDiceNo, updatePlayerChance } from "@/redux/reducers/gameSlice";

const Dice = React.memo(({ color, rotate, player, data }) => {
  const dispatch = useDispatch()
  const currentPlayerChance = useSelector(selectCurrentPlayerChance)
  const isDiceRolled = useSelector(selectDiceRolled)
  const diceNo = useSelector(selectDiceNo);
  const playerPieces = useSelector(state => state.game[`player${currentPlayerChance}`]);

  const pileIcon = BackgroundImage.GetImage(color);
  const diceIcon = BackgroundImage.GetImage(diceNo);
  const arrowAnim = useRef(new Animated.Value(0)).current;
  const [diceRolling, setDiceRolling] = useState(false);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const handleDicePress = async () => {
    const newDiceNo = Math.floor(Math.random() * 6) + 1;
    console.log(newDiceNo, "newDiceNo");
    // const newDiceNo = 6;
    playSound("dice_roll")
    setDiceRolling(true)
    await delay(800)
    dispatch(updateDiceNo({ diceNo: newDiceNo }))
    setDiceRolling(false)

    const isAnyPieceAlive = data?.findIndex(i => i.pos != 0 && i.pos != 57)
    const isAnyPieceLocked = data?.findIndex(i => i.pos == 0)
    console.log(isAnyPieceAlive, "isAnyPieceAlive == -1");

    if (isAnyPieceAlive == -1) {
      if (diceNo == 6) {
        dispatch(enablePileSelection({ playerNo: player }))
      } else {
        let chancePlayer = player + 1;
        if (chancePlayer > 4) {
          chancePlayer = 1
        }
        await delay(600)
        dispatch(updatePlayerChance({ chancePlayer: chancePlayer }))
      }
    } else {
      const canMov = playerPieces.some(pile => pile.travelCount + newDiceNo <= 57 && pile.pos != 0);
      if ((!canMov && diceNo == 6 && isAnyPieceLocked == -1) ||
        (!canMov && diceNo != 6 && isAnyPieceLocked != -1) ||
        (!canMov && diceNo != 6 && isAnyPieceLocked == -1)

      ) {
        let chancePlayer = player + 1;
        if (chancePlayer > 4) {
          chancePlayer = 1
        }
        await delay(600);
        dispatch(updatePlayerChance({ chancePlayer: chancePlayer }));
        return
      }
      if (newDiceNo == 6) {
        dispatch(enablePileSelection({ playerNo: player }))
      }
      dispatch(enablePileSelection({ playerNo: player }))
    }
  }

  useEffect(() => {
    const animateArrow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(arrowAnim, {
            toValue: 10,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(arrowAnim, {
            toValue: -10,
            duration: 600,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    animateArrow()
  }, []);


  return (
    <View
      style={[styles.flexRow, { transform: [{ scaleX: rotate ? -1 : 1 }] }]}
    >
      <View style={styles.border1}>
        <LinearGradient
          // start={styles.linearGradient}
          colors={['#0052be', '#5f9fcb', '#97c6c9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
          <View style={styles.pileContainer}>
            <Image source={pileIcon} style={styles.pileIcon} />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.border2}>
        <LinearGradient
          style={styles.diceGradient}
          colors={["#aac8ab", "#aac8ab", "#aac8ab"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.diceContainer}>
            {currentPlayerChance === player && !diceRolling &&
              <TouchableOpacity
                disabled={isDiceRolled}
                activeOpacity={0.4}
                onPress={handleDicePress}
              >
                <Image source={diceIcon} style={styles.dice} />
              </TouchableOpacity>

            }
          </View>
        </LinearGradient>
      </View>
      {currentPlayerChance === player && !isDiceRolled &&
        <Animated.View style={{ transform: [{ translateX: arrowAnim }] }}>
          <Image source={Arrow} style={{ width: 50, height: 30 }} />
        </Animated.View>
      }

      {currentPlayerChance === player && diceRolling &&
        <LottieView
          source={DiceRoll}
          style={styles.rollingDice}
          loop={false}
          autoPlay
          cacheComposition={true}
          hardwareAccelerationAndroid
        />

      }
    </View>
  );
});

const styles = StyleSheet.create({

  diceGradient: {
    borderWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#f0ce2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rollingDice: {
    height: 80,
    width: 80,
    zIndex: 99,
    // left: 38,
    top: -25,
    position: 'absolute'
  },
  dice: {
    height: 45,
    width: 45
  },
  diceContainer: {
    backgroundColor: '#e8c0c1',
    borderWidth: 1,
    borderRadius: 5,
    width: 55,
    height: 55,
    paddingHorizontal: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  border1: {
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: "#f0ce2c",
  },
  border2: {
    borderWidth: 3,
    padding: 1,
    backgroundColor: '#aac8ab',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderColor: '#aac8ab',
  },
  pileIcon: {
    width: 35,
    height: 35
  },
  pileContainer: {
    paddingHorizontal: 3
  },
});

export default Dice;
