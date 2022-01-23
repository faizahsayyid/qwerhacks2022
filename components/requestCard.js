import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { color, t } from "react-native-tailwindcss";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const RequestCard = ({ username, receiver, sender, status }) => {
  // const { userId } = useContext(GlobalContext);
  const userId = "recmp1vJp3pkboru7";
  const navigation = useNavigation();

  const acceptRequest = () => {
    alert(`Accepted connection request from ${username}`);
  };

  const rejectRequest = () => {
    alert(`Rejected connection request from ${username}`);
  };

  const onCardPressed = () => {
    if (userId === sender && status === "Pending") {
      alert(`${username} has not responded to your request`);
    } else if (status === "Accepted" && user == sender) {
      navigation.navigate("", { id: receiver });
    } else if (status === "Accepted" && user == receiver) {
      navigation.navigate("", { id: sender });
    }
  };

  let rightContent;

  if (status == "Pending") {
    const userIsReceiver = userId == receiver;
    console.log("userId", userId);

    if (userIsReceiver) {
      rightContent = (
        <View style={[t.flexRow]}>
          <TouchableHighlight onPress={acceptRequest}>
            <MaterialIcons
              style={[t.mR4]}
              name="check-circle"
              size={28}
              color="#38b2ac"
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={rejectRequest}>
            <MaterialIcons name="cancel" size={28} color="#e53e3e" />
          </TouchableHighlight>
        </View>
      );
    } else {
      rightContent = <Text style={[t.textGray500]}>Pending</Text>;
    }
  } else {
    rightContent = <Text style={[t.textTeal500]}>Accepted</Text>;
  }

  return (
    <TouchableHighlight
      style={[
        t.flexRow,
        t.itemsCenter,
        t.justifyBetween,
        t.wFull,
        t.bgWhite,
        t.p6,
        t.roundedLg,
        t.mB2,
      ]}
      disabled={userId === receiver && status === "Pending"}
      onPress={onCardPressed}
    >
      <Text style={[t.textGray700]}>{username}</Text>

      {rightContent}
    </TouchableHighlight>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F3F7F7",
//   },
// });
