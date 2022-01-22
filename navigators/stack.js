import {createStackNavigator} from '@react-navigation/stack';
import { SearchUsers } from '../components/SearchUsers';
import {Landing} from '../components/Landing';
import {Login} from '../components/Login';
import {SignUp} from '../components/SignUp';
import STIDashboard from '../components/STIDashboard';
import DocumentUploadCard from '../components/DocumentUploadCard';
const Stack=createStackNavigator();
function MyStack(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing Page" component={Landing}/>
            <Stack.Screen name="Login Page" component={Login} />
            <Stack.Screen name="Signup Page" component={SignUp} />
            <Stack.Screen name="Dashboard Page" component={STIDashboard} />
            <Stack.Screen name="Upload Page" component={DocumentUploadCard} />
        </Stack.Navigator>
    )
}

export default MyStack;
