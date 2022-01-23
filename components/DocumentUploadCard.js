import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {useState} from 'react';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {AntDesign} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import base from '../airtable';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

// require("dotenv").config();
// const cloudinary=require("cloudinary").v2;
// console.log(cloudinary.config().cloud_name);
const verifyPermissions=async()=>{
  const result=await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
  if(result.status!="granted"){alert('Permission denied');}
  if(result.status=="granted"){return true;}
}

const PickerFormer=(initialValue)=>{
    const [selectedValue, setSelectedValue] = useState(initialValue);
    return(
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, backgroundColor:'#003366', color:'#03DAC5', }}
        onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue);}}
      >
      <Picker.Item label="Positive" value="+ve" selected='true' />
      <Picker.Item label="Negative" value="-ve"/>
      <Picker.Item label="No Result" value= "--"/>
      <Picker.Item label="Not applicable" value="NA"/>
    </Picker>
    );
}

function DocumentUploadCard({route, navigation}){
  const [path, setPath] = useState('');
  const {STDName, status, id, documentId}=route.params;
  const [selectedValue, setSelectedValue] = useState(status);

  const takeImage = async () => {
   try{ const hasPermission=await verifyPermissions();
    if(!hasPermission){return;}
    const CLOUDINARY_URL="https://api.cloudinary.com/v1_1/qwer-hacks-2022/upload";
    const image=await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true});

      let base64Img = `data:image/jpg;base64,${image.base64}`;
      let data = {
        "file": base64Img,
        "upload_preset": "vhrwepzr",
      }
      
      fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(res => res.json()  
      //  setPath(data.url);
      //  console.log(path);
      ).then(
        res=>{setPath(res.secure_url);}
      )/*.catch(err => console.log(err))*/


    // cloudinary.uploader.upload("image.uri",{resource_type:"image",})
    // .then(resp => resp.json())
    // .then(data => {
    // setPath(data.url)
    // console.log(path);
    // })
    // .catch(error => console.log(error))

    // const fileName=image.uri.split('/').pop();
    // const newPath=FileSystem.documentDirectory + fileName;
    // setPath(newPath);
    // console.log(newPath);
    // await FileSystem.moveAsync({
    //   from:image.uri,
    //   to:newPath
    // })
  }catch{(err)=>console.error(err)}
  };

  function uploadFile() {
    if (path) {
      const fileToUpload =path;
      let shouldUpdate=false;
      base('Documents').create([
        {
          "fields": {
            "userID": [
              id
            ],
            "documentFile": [
              {
                "url": path? path : ''
              }
            ]
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        setPath("");
      });
    } 
    else {
      alert('Please Select File first');
    }
  };

  function updateStatus(){
    let resultsid="";
    let documents=[];
    let retrievedName="";
    if(selectedValue!==status){
      base('Users').find(id, (err, records)=>{
        if(err){console.log(err); return;}
        resultsid=records.fields.STDResultsID;
        resultsid.forEach((elementid)=>{
          base('STDResults').find(elementid, (error, record)=>{
            if(error){console.log(error); return;}
            retrievedName=record.get('STDName');
            if(retrievedName==STDName){
              base('STDResults').update([
                {
                  "id": elementid,
                  "fields": {
                    "status": selectedValue,
                    "STDName": STDName,
                  }
                },
              ], function(err) {
                if (err) {
                  console.error(err);
                  return;
                }
               navigation.goBack();
              });
            }
            console.log(retrievedName);
            console.log(STDName);
          })
        })
      })
    }
    if(path){
      base('Documents').find(documentId,(err, records)=>{
        if(err){console.log(err);return;}
        documents=records.get('documentFile');
        if(!documents){
          uploadFile();
        }
        else{
          base('Documents').update([
            {
              "id": documentId,
              "fields": {
                "documentFile": [
                  {
                    "url": path?path:''
                  }
                ]
              }
            },
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
        

      })
    }
  }
        let [fontsLoaded] = useFonts({
            'Inter': require('../assets/fonts/Inter-Regular.ttf'),
          });
          if (!fontsLoaded) {
              return <AppLoading/>;
          }
          else{
            return(
              <View style={styles.container}>
                <View style={ {display:'flex', marginTop:30, flexDirection:'row', justifyContent:'space-around'}}>
                  <View>
                    <Text style={{fontFamily:'Inter', color:'#14B8A6', fontSize:24}}>{STDName}</Text>
                    <Picker
        selectedValue={selectedValue}
        style={{ height: 50, color:'black', width:170 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
      <Picker.Item label="Positive" value="Positive" selected='true' />
      <Picker.Item label="Negative" value="Negative"/>
      <Picker.Item label="Not uploaded" value= "not uploaded"/>
      {/* <Picker.Item label="Not applicable" value="NA"/> */}
    </Picker>
                  </View>
                  <View>
                    {selectedValue==="Positive"? <TouchableOpacity style={{backgroundColor:'#14B8A6', width:58.45, height: 58.45, borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center'}}><AntDesign name="plus" size={24} color="white" /></TouchableOpacity>:
                     selectedValue==="Negative"? <TouchableOpacity style={{borderColor:'#14B8A6', width:58.45, height: 58.45, borderRadius:50, borderWidth:2, display:'flex', alignItems:'center', justifyContent:'center'}}><AntDesign name="minus" size={34} color="#14B8A6" /></TouchableOpacity> :
                    <Text style={{fontFamily:'Inter', marginTop:15, color:'#374151', fontSize:18}}>Pending</Text>}
                    
                  </View>
                </View>
                <View style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:32}}>
                  {path!=="" && <Image source={{uri: path}} style={{width:300, height:300}} />}
                <TouchableOpacity style={{backgroundColor:'#374151', width:311, height: 58.45, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:20, marginBottom:10}} onPress={takeImage}><Text style={{color:'#FFF', fontSize:18, fontWeight:'bold', letterSpacing:0.8}}>SELECT FILE</Text></TouchableOpacity>
                {/* <TouchableOpacity style={{backgroundColor:'#14B8A6', width:311, height: 58.45, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:20, marginBottom:10}} onPress={uploadFile}><Text style={{color:'#FFF', fontSize:18, fontWeight:'bold',letterSpacing:0.8}}>UPLOAD</Text></TouchableOpacity> */}
                <TouchableOpacity style={{width:311, height: 58.45, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:20, borderWidth:3, borderColor:'#14B8A6'}} onPress={updateStatus}><Text style={{color:'#374151', fontSize:18, fontWeight:'bold',letterSpacing:0.8}}>SAVE</Text></TouchableOpacity>
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