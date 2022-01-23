import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import DashboardCard from './DashboardCard';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import base from '../airtable';

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
              <View style={styles.container}>
                <View><Text style={{fontWeight:'bold', fontSize:14, margin:20, marginLeft:30, letterSpacing:0.8}}>{userName.toUpperCase()} SEXUAL HEALTH</Text></View>
                <View style={{  display:'flex', alignItems:'center'}}>
                {STIObject.map((element)=>{
                    return(<DashboardCard STDName={element.STIName} status={element.status} child={element.STDName} 
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

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f3f7f7',
      height:Dimensions.get('window').height,
      width:Dimensions.get('window').width,
      flex:1
    },
  });
  
export default STIDashboard;