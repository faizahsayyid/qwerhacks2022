import DocumentUploadCard from './components/DocumentUploadCard'
import MyStack from './navigators/stack'
import { NavigationContainer } from '@react-navigation/native'
import STIDashboard from './components/STIDashboard';

export default function App(){
 return(
  <NavigationContainer>
    <MyStack />
  </NavigationContainer>
 )
}