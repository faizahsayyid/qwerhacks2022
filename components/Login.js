import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export const Login = () => {
  const { userId } = useContext(GlobalContext);
  return (
    <View>
      <Text>Username</Text>
      <TextInput placeholder="" />
      <Text>Password</Text>
      <TextInput placeholder="" />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
