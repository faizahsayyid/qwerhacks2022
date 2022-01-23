import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import DashboardCard from './DashboardCard';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import base from '../airtable';
import { color, t } from 'react-native-tailwindcss';
import { MaterialIcons } from '@expo/vector-icons';

// const STIObjects=[{STDName: "Chlamydia", status: "Positive"},
// {STDName:"Gonorrhea", status:"Negative"},
// {STDName:"Herpes", status:"Negative"},
// {STDName:"HIV", status:"Negative"},
// {STDName:"Syphilis", status:"Not uploaded"}];

function STIDashboard({navigation, route}){

    const[STIObject, setSTIObject]=useState([]);
    const[userName, setUserName]=useState("")
    const {id}=route.params;
    function FetchSTIs(){
        
        let STIIds=[];
        base('Users').find(id, function(err, record) {
            if (err) { console.error(err); return; }
            STIIds=record.fields.STDResultsID;
            setUserName(record.fields.username);
            STIIds.forEach((element)=>{
                base('STDResults').find(element, function(err, record){
                    if(err){console.error(err); return;}
                    setSTIObject((prevValue)=> prevValue.concat({STIName: record.fields.STDName, status:record.fields.status}));
                })
            })
        });
    }

    useEffect(()=>{
        FetchSTIs();
    },[])


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
                  <Text style={[t.fontBold, t.textSm, t.trackingWider, t.textGray700]}>{userName.toUpperCase()} SEXUAL HEALTH</Text>

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
                {STIObject.map((element)=>{
                    return(<DashboardCard STDName={element.STDName} status={element.status} child={element.STDName}
                        onPress={()=>{navigation.navigate('Upload Page',{
                            STDName:element.STIName,
                            status:element.status,
                            id:id
                        })}}/>)
                })}
                </View>
              </View>
            </ScrollView>
            )
      }
}



export default STIDashboard;
