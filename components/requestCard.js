
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { color, t } from 'react-native-tailwindcss';
import { MaterialIcons } from '@expo/vector-icons';

export const RequestCard = ({username, receiver, sender, status}) => {
  // const { userId } = useContext(GlobalContext);
  const userId = 'recmp1vJp3pkboru7';

  const acceptRequest = () => {
    alert(`Accepted connection request from ${username}`);
  }

  const rejectRequest = () => {
    alert(`Rejected connection request from ${username}`);
  }

  let rightContent;

  if (status == "Pending"){
    const userIsReceiver = userId == receiver;
    console.log("userId", userId)

    if (userIsReceiver){
      rightContent = <View style={[t.flexRow]}>
          <TouchableHighlight onPress={acceptRequest} >
            <MaterialIcons style={[t.mR4]} name="check-circle" size={28} color="#38b2ac" />
          </TouchableHighlight>
          <TouchableHighlight onPress={rejectRequest} >
            <MaterialIcons name="cancel" size={28} color="#e53e3e" />
          </TouchableHighlight>
        </View>
    } else {
      rightContent = <Text style={[t.textGray500]}>Pending</Text>
    }
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
