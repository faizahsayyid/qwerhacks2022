import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {AntDesign} from '@expo/vector-icons';
import { color, t } from 'react-native-tailwindcss';

function DashboardCard({STDName, status, navigation, onPress}){
    let [fontsLoaded] = useFonts({
        'Inter': require('../assets/fonts/Inter-Regular.ttf'),
      });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else{
      return(
          <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, t.wFull, t.bgWhite, t.p6, {borderRadius: 24}, t.mB2]}>
            <View>
              <Text style={[{fontFamily:'Inter'}, t.textTeal500, t.text2xl]}>{STDName}</Text>
              <TouchableOpacity><Text style={[{fontFamily:'Inter'}, t.textSm, t.textGray700]}>{status}</Text></TouchableOpacity>
            </View>
            <View>

              {status==="Positive"? <TouchableOpacity style={[t.bgTeal500, t.w16, t.h16, t.roundedFull, t.flexRow, t.justifyCenter, t.itemsCenter]} onPress={onPress}><AntDesign name="plus" size={32} color="white" /></TouchableOpacity>:
               status==="Negative"? <TouchableOpacity style={[t.borderTeal500, t.borderSolid, t.border4, t.w16, t.h16, t.roundedFull, t.flexRow, t.justifyCenter, t.itemsCenter]}><AntDesign name="minus" size={36} color="#14B8A6" /></TouchableOpacity> :
              <Text style={[{fontFamily:'Inter'}, t.textGray500]}>Pending</Text>}

            </View>
          </View>
      )
    }
}


export default DashboardCard;
