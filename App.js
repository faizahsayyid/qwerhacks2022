import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SearchUsers } from "./components/SearchUsers";
import { GlobalProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
