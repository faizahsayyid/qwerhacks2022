import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {useState} from 'react';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {AntDesign} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import base from '../airtable';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

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
  const [path, setPath] = useState('');
  const {STDName, status, id}=route.params;
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
      }).then(async r => {
        let data = await r.json()
  
  //Here I'm using another hook to set State for the photo that we get back //from Cloudinary
  
       setPath(data.url);
       console.log(path);
      }).catch(err => console.log(err))
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
        records.forEach(function (record) {
          console.log(record.getId());
        });
      });
    } 
    else {
      alert('Please Select File first');
    }
  };
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
                  {/* {path!="" && <Image source={path} style={{width:300, height:300}} />} */}
                <TouchableOpacity style={{backgroundColor:'#374151', width:311, height: 58.45, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:20}} onPress={takeImage}><Text style={{color:'#FFF', fontSize:18, fontWeight:'bold'}}>SELECT FILE</Text></TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'#374151', width:311, height: 58.45, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:20}} onPress={uploadFile}><Text style={{color:'#FFF', fontSize:18, fontWeight:'bold'}}>UPLOAD</Text></TouchableOpacity>
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