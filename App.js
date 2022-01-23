import DocumentUploadCard from "./components/DocumentUploadCard";
import MyStack from "./navigators/stack";
import { NavigationContainer } from "@react-navigation/native";
import STIDashboard from "./components/STIDashboard";
import { GlobalProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </GlobalProvider>
  );
}
