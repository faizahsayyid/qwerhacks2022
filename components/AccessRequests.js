import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from "react-native";
import { useContext } from "react";
import { color, t } from 'react-native-tailwindcss';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalContext } from "../contexts/GlobalContext";
import { RequestCard } from "./requestCard";

export const AccessRequests = () => {
  const { setUserId } = useContext(GlobalContext);
  return (
    <View style={[{backgroundColor: "#F3F7F7"}, t.p8, t.hFull, t.pT20]}>

      <TouchableHighlight>
        <MaterialIcons style={[t.mB8]} name="arrow-back" size={24} color="black" />
      </TouchableHighlight>

      <Text style={[t.textSm, t.uppercase, t.fontBold, t.mB4, t.textGray700]}>Access Requests</Text>

      <RequestCard username="ascend2001" status="Pending"/>
      <RequestCard username="indoorliving" status="Received"/>
      <RequestCard username="fyfy" status="Accepted"/>

      <StatusBar style="dark"/>
    </View>
  );
};
