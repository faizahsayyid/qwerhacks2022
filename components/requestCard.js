
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { color, t } from 'react-native-tailwindcss';
import { MaterialIcons } from '@expo/vector-icons';

export const RequestCard = ({username, status}) => {
  const { setUserId } = useContext(GlobalContext);

  const acceptRequest = () => {
    alert(`Accepted connection request from ${username}`);
  }

  const rejectRequest = () => {
    alert(`Rejected connection request from ${username}`);
  }

  let rightContent;
  if (status == "Received"){
    rightContent = <View style={[t.flexRow]}>
      <TouchableHighlight onPress={acceptRequest} >
        <MaterialIcons style={[t.mR4]} name="check-circle" size={28} color="#38b2ac" />
      </TouchableHighlight>
      <TouchableHighlight onPress={rejectRequest} >
        <MaterialIcons name="cancel" size={28} color="#e53e3e" />
      </TouchableHighlight>
    </View>
  } else if (status == "Pending"){
    rightContent = <Text style={[t.textGray500]}>Pending</Text>
  } else {
    rightContent = <Text style={[t.textTeal500]}>Accepted</Text>
  }

  return (
    <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.wFull, t.bgWhite, t.p6, t.roundedLg, t.mB2]}>
      <Text style={[t.textGray700]}>{username}</Text>

      {rightContent}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F3F7F7",
//   },
// });
