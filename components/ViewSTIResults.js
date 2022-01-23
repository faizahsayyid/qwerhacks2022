import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import base from "../airtable";

export const ViewSTIResults = ({ route, navigation }) => {
  const { STDName, status, id, documentId } = route.params;
  const [document, setDocument] = useState();

  useEffect(() => {
    if (documentId) {
      base("Documents").find(documentId, (err, record) => {
        if (err) {
          console.error(err);
          return;
        }
        setDocument(record.fields.documentFile[0].thumbnails.large.url);
      });
    }
  }, [documentId]);

  return (
    <View style={{backgroundColor:"#FFF"}}>
      <Text style={{fontFamily:'Inter', color:'#374151', fontSize:24, marginTop:10, marginLeft:20}}>{STDName}</Text>
      {status=="Positive"?<Text style={{fontFamily:'Inter', color:'#DC2626', fontSize:24,marginLeft:20,marginTop:10}}>{status}</Text>:
      status=="Negative"?<Text style={{fontFamily:'Inter', color:'#14B8A6', fontSize:24,marginLeft:20,marginTop:10}}>{status}</Text>:
      <Text style={{fontFamily:'Inter', color:'#374151', fontSize:24,marginLeft:20,marginTop:10}}>{status}</Text>}
      {/* <Text>{id} {documentId}</Text> */}
      <Image source={{ uri: document }} style={{width:300, height:300,marginLeft:20, marginTop:50}}/>
    </View>
  );
};
