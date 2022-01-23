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
        setDocument(record.get("url"));
      });
    }
  }, [documentId]);

  return (
    <View>
      <Text>
        {STDName} {status} {id} {documentId} {document}
      </Text>
      <Image source={{ uri: document }} />
    </View>
  );
};
