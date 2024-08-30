import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Wrapper from "@/components/Wrapper";
import MenuIcon from "../../assets/images/menu.png";
import { deviceHeight, deviceWidth } from "@/constants/Scalling";
import Dice from "@/components/Dice";
import Pocket from "@/components/Pocket";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <Wrapper>
      <TouchableOpacity style={{ position: "absolute", top: 60, left: 20 }}>
        <Image source={MenuIcon} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Dice color={Colors.green} />
          <Dice color={Colors.yellow} rotate />
        </View>

        <View style={styles.ludoBoard}>
          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} />
          </View>
        </View>

        <View style={styles.flexRow}>
          <Dice color={Colors.red} />
          <Dice color={Colors.blue} rotate />
        </View>
      </View>
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
});
