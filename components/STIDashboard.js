import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import DashboardCard from './DashboardCard';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
const STIObjects=[{STDName: "Chlamydia", status: "Positive"},
{STDName:"Gonorrhea", status:"Negative"},
{STDName:"Herpes", status:"Negative"},
{STDName:"HIV", status:"Negative"},
{STDName:"Syphilis", status:"Not uploaded"}];

function STIDashboard({userName, navigation}){
    let [fontsLoaded] = useFonts({
        'Inter': require('../assets/fonts/Inter-Regular.ttf'),
      });
      if (!fontsLoaded) {
          return <AppLoading/>;
      }
      else{
        return(
            <ScrollView>
              <View style={styles.container}>
                <View><Text style={{fontWeight:'bold', fontSize:14}}>ASCEND2001'S SEXUAL HEALTH</Text></View>
                <View style={{  display:'flex', alignItems:'center'}}>
                {STIObjects.map((element)=>{
                    return(<DashboardCard STDName={element.STDName} status={element.status} child={element.STDName} 
                        onPress={()=>{navigation.navigate('Upload Page',{
                            STDName:element.STDName,
                            status:element.status
                        })}}/>)
                })}
                </View>  
              </View>
            </ScrollView>
            )}
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f3f7f7',
      height:Dimensions.get('window').height,
      width:Dimensions.get('window').width,
    },
  });
  
export default STIDashboard;