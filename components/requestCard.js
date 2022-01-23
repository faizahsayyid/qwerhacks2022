
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { color, t } from "react-native-tailwindcss";
import { MaterialIcons } from "@expo/vector-icons";
import base from "../airtable";
import { useNavigation } from "@react-navigation/native";

export const RequestCard = ({
  requestId,
  username,
  receiver,
  sender,
  status,
  setRefresh,
  refresh,
}) => {
  const { userId } = useContext(GlobalContext);
  const navigation = useNavigation();

  const acceptRequest = () => {
    base("AccessSTDRequest")
      .update([
        {

          id: requestId,
          fields: {
            requestStatus: "Accepted",
          },
        },
      ])
      .then(() => setRefresh(!refresh))
      .catch((err) => console.log(err));
  };

  const rejectRequest = () => {
    setRefresh(!refresh);
    base("AccessSTDRequest")
      .update([
        {
          id: requestId,
          fields: {
            requestStatus: "Rejected",
          },
        },
      ])
      .catch((err) => console.log(err));
  };

  const onCardPressed = () => {
    if (userId === sender[0] && status === "Pending") {
      alert(`${username} has not responded to your request`);
    } else if (status === "Accepted" && userId == sender[0]) {
      navigation.navigate("Dashboard", {
        id: receiver[0],
        username,
        disabled: true,
      });
    } else if (status === "Accepted" && userId == receiver[0]) {
      navigation.navigate("Dashboard", {
        id: sender[0],
        username,
        disabled: true,
      });
    }
  };

  let rightContent;

  if (status == "Pending") {
    const userIsReceiver = userId == receiver[0];
    console.log("userId", userId);


    if (userIsReceiver) {
      rightContent = (
        <View style={[t.flexRow]}>
          <TouchableOpacity onPress={acceptRequest}>
            <MaterialIcons
              style={[t.mR4]}
              name="check-circle"
              size={28}
              color="#38b2ac"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={rejectRequest}>
            <MaterialIcons name="cancel" size={28} color="#e53e3e" />
          </TouchableOpacity>
        </View>
      );
    } else {
      rightContent = <Text style={[t.textGray500]}>Pending</Text>;
    }

  } else if (status == "Accepted") {
    rightContent = <Text style={[t.textTeal500]}>Connected</Text>;
  } else {
    rightContent = <Text style={[t.textRed600]}>Rejected</Text>;
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
      underlayColor={color.gray100}
      onPress={onCardPressed}
    >
      <>
        <Text style={[t.textGray700]}>{username}</Text>
        {rightContent}
      </>
    </TouchableHighlight>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F3F7F7",
//   },
// });
