import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from "react-native";
import { useState, useEffect } from "react";
import { color, t } from 'react-native-tailwindcss';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalContext } from "../contexts/GlobalContext";
import { RequestCard } from "./requestCard";
import base from "../airtable";

export const AccessRequests = ({navigation}) => {
  const [requests, setRequests] = useState([])
  const userId = "recmp1vJp3pkboru7"

  useEffect(() => {
    let newRequests = []
    base("AccessSTDRequest")
      .select({
        filterByFormula: `OR("${userId}" = {receiverID}, "${userId}" = {senderID})`,
        })
      .eachPage((records, fetchNextPage) => {
        newRequests = [
          ...newRequests,
          ...records.map(async (record) => {
            const rec = record.get('receiverID');
            const sen = record.get('senderID');
            const id = userId == rec ? sen : rec;

            let username = ""

            await base("Users").find(id, function(err, record) {
              if (err) { console.error(err); return; }
              console.log('Found', record.get('username'));
              username = record.get('username')
            })

            // username resolves as undefined even though it's Found in line 30

            console.log('Retrieved', username);

            return {
              username: username,
              status: record.get('requestStatus'),
            }

          }),
        ];
        fetchNextPage();
      })
      .then(() => {
        setRequests(newRequests);
      })
      .catch((err) => console.error(err));
  }, [])

  return (
    <View style={[{backgroundColor: "#F3F7F7"}, t.p8, t.hFull]}>

      {requests != [] && requests.map((record, index) => (
        <RequestCard
          username={record.username}
          status="Pending" key={index}/>
        ))}

      <StatusBar style="dark"/>
    </View>
  );
};

// <RequestCard username="ascend2001" status="Pending"/>
// <RequestCard username="indoorliving" status="Received"/>
// <RequestCard username="fyfy" status="Accepted"/>
