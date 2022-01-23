import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { color, t } from "react-native-tailwindcss";
import { MaterialIcons } from "@expo/vector-icons";
import { GlobalContext } from "../contexts/GlobalContext";
import { RequestCard } from "./requestCard";
import base from "../airtable";

export const AccessRequests = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const { userId } = useContext(GlobalContext);

  useEffect(() => {
    let newRequests = [];
    base("AccessSTDRequest")
      .select({
        filterByFormula: `OR("${userId}" = {receiverID}, "${userId}" = {senderID})`,
      })
      .eachPage((records, fetchNextPage) => {
        newRequests = [
          ...newRequests,
          ...records.map((record) => {
            const rec = record.get("receiverID");
            const sen = record.get("senderID");
            const id = userId == rec ? sen : rec;

            return base("Users")

              .find(id)
              .then((record) => {
                return record.get("username");
              })
              .then((u) => {
                return {
                  requestId: record.id,
                  username: u,
                  receiver: rec,
                  sender: sen,
                  status: record.get("requestStatus"),
                };
              })
              .catch((err) => console.error(err));
          }),
        ];
        fetchNextPage();
      })
      .then(async () => {
        const p = await Promise.all(newRequests);
        setRequests(p);
      })
      .catch((err) => console.error(err));

  }, [refresh]);

  return (
    <View style={[{ backgroundColor: "#F3F7F7" }, t.p8, t.hFull]}>
      {requests != [] &&
        requests.map((record, index) => (
          <RequestCard
            username={record.username}
            status={record.status}
            receiver={record.receiver}
            sender={record.sender}
            requestId={record.requestId}
            setRefresh={setRefresh}
            refresh={refresh}
            key={index}

          />
        ))}

      <StatusBar style="dark" />
    </View>
  );
};

// <RequestCard username="ascend2001" status="Pending"/>
// <RequestCard username="indoorliving" status="Received"/>
// <RequestCard username="fyfy" status="Accepted"/>
