import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {AntDesign} from '@expo/vector-icons';

function DashboardCard({STDName, status, navigation, onPress}){
        let [fontsLoaded] = useFonts({
            'Inter': require('../assets/fonts/Inter-Regular.ttf'),
          });
          if (!fontsLoaded) {
              return <AppLoading/>;
          }
          else{
            return(
                <View style={ {display:'flex', flexDirection:'row', justifyContent:'space-around', backgroundColor: '#fff', height:91.32, width:311, marginTop:10, paddingTop:15, borderRadius:20}}>
                  <View style={{flexGrow:1, marginLeft:30}}>
                    <Text style={{fontFamily:'Inter', color:'#14B8A6', fontSize:24}}>{STDName}</Text>
                    <TouchableOpacity><Text style={{fontFamily:'Inter',fontSize:14}}>{status}</Text></TouchableOpacity>
                  </View>
                  <View style={{marginRight:30}}>
                    {status==="Positive"? <TouchableOpacity style={{backgroundColor:'#14B8A6', width:58.45, height: 58.45, borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center'}} onPress={onPress}><AntDesign name="plus" size={24} color="white" /></TouchableOpacity>:
                     status==="Negative"? <TouchableOpacity style={{borderColor:'#14B8A6', width:58.45, height: 58.45, borderRadius:50, borderWidth:2, display:'flex', alignItems:'center', justifyContent:'center'}} onPress={onPress}><AntDesign name="minus" size={34} color="#14B8A6" /></TouchableOpacity> :
                    <Text style={{fontFamily:'Inter', marginTop:15, color:'#374151', fontSize:18}} onPress={onPress}>Pending</Text>}
                    
                  </View>
                </View>
            )
          }
}

  
export default DashboardCard;