import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useState} from 'react';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {AntDesign} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

const PickerFormer=(initialValue)=>{
    const [selectedValue, setSelectedValue] = useState(initialValue);
    return(
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, backgroundColor:'#003366', color:'#03DAC5', }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
      <Picker.Item label="Positive" value="+ve" selected='true' />
      <Picker.Item label="Negative" value="-ve"/>
      <Picker.Item label="No Result" value= "--"/>
      <Picker.Item label="Not applicable" value="NA"/>
    </Picker>
    );
}

function DocumentUploadCard({route}){
  const {STDName, status}=route.params;
    const [selectedValue, setSelectedValue] = useState(status);
        let [fontsLoaded] = useFonts({
            'Inter': require('../assets/fonts/Inter-Regular.ttf'),
          });
          if (!fontsLoaded) {
              return <AppLoading/>;
          }
          else{
            return(
              <View style={styles.container}>
                <View style={ {display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                  <View>
                    <Text style={{fontFamily:'Inter', color:'#14B8A6', fontSize:24}}>{STDName}</Text>
                    <Picker
        selectedValue={selectedValue}
        style={{ height: 50, color:'black', width:170 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
      <Picker.Item label="Positive" value="+ve" selected='true' />
      <Picker.Item label="Negative" value="-ve"/>
      <Picker.Item label="No Result" value= "--"/>
      <Picker.Item label="Not applicable" value="NA"/>
    </Picker>
                  </View>
                  <View>
                    {selectedValue==="+ve"? <TouchableOpacity style={{backgroundColor:'#14B8A6', width:58.45, height: 58.45, borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center'}}><AntDesign name="plus" size={24} color="white" /></TouchableOpacity>:
                     selectedValue==="-ve"? <TouchableOpacity style={{borderColor:'#14B8A6', width:58.45, height: 58.45, borderRadius:50, borderWidth:2, display:'flex', alignItems:'center', justifyContent:'center'}}><AntDesign name="minus" size={34} color="#14B8A6" /></TouchableOpacity> :
                    <Text style={{fontFamily:'Inter', marginTop:15, color:'#374151', fontSize:18}}>Pending</Text>}
                    
                  </View>
                </View>
                <View style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:32}}>
                  <TouchableOpacity style={{backgroundColor:'#374151', width:311, height: 58.45, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:20}}><Text style={{color:'#FFF', fontSize:18, fontWeight:'bold'}}>UPLOAD</Text></TouchableOpacity>
                </View>
              </View>
            )
          }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });
  
export default DocumentUploadCard;