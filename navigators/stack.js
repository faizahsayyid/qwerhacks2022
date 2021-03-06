import { createStackNavigator } from "@react-navigation/stack";
import { SearchUsers } from "../components/SearchUsers";
import { Landing } from "../components/Landing";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import STIDashboard from "../components/STIDashboard";
import DocumentUploadCard from "../components/DocumentUploadCard";
import { AccessRequests } from "../components/AccessRequests";
import { ViewSTIResults } from "../components/ViewSTIResults";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Landing Page"
        component={Landing}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login Page"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup Page"
        component={SignUp}
      />
      <Stack.Screen name="Dashboard" component={STIDashboard} />
      <Stack.Screen name="Upload" component={DocumentUploadCard} />
      <Stack.Screen name="View Results" component={ViewSTIResults} />
      <Stack.Screen name="Access Requests" component={AccessRequests} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Search Users"
        component={SearchUsers}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
