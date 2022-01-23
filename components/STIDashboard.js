import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import DashboardCard from './DashboardCard';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import { color, t } from 'react-native-tailwindcss';
import { MaterialIcons } from '@expo/vector-icons';

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
              <View style={[{backgroundColor: "#F3F7F7"}, t.p8, t.hFull]}>
                <View style={[t.mB4, t.flexRow, t.justifyBetween, t.itemsEnd]}>
                  <Text style={[t.fontBold, t.textSm, t.trackingWider, t.textGray700]}>ASCEND2001</Text>

                  <View style={[t.flexRow]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search Users')} >
                      <MaterialIcons style={[t.mR4]} name="person-add" size={36} color="#374151" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Access Requests')} >
                      <MaterialIcons name="notifications" size={36} color="#374151" />
                    </TouchableOpacity>
                  </View>
                </View>


                <View>
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

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: '#f3f7f7',
//       height:Dimensions.get('window').height,
//       width:Dimensions.get('window').width,
//     },
//   });

export default STIDashboard;
