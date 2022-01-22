import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from "react-native";
import { useContext } from "react";
import { color, t } from 'react-native-tailwindcss';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalContext } from "../contexts/GlobalContext";
import { RequestCard } from "./requestCard";

export const AccessRequests = ({navigation}) => {

  return (
    <View style={[{backgroundColor: "#F3F7F7"}, t.p8, t.hFull]}>

      <RequestCard username="ascend2001" status="Pending"/>
      <RequestCard username="indoorliving" status="Received"/>
      <RequestCard username="fyfy" status="Accepted"/>

      <StatusBar style="dark"/>
    </View>
  );
};
