import React from "react";
import { Modal, View, Text, TouchableHighlight, Alert } from "react-native";
import { t } from "react-native-tailwindcss";
import { useNavigation } from "@react-navigation/native";

export const SendRequestModal = ({ visible, setVisible, username }) => {
  const navigation = useNavigation();

  const onYes = () => {
    Alert.alert("Access STD Status Request Sent");
    navigation.navigate("Access Requests");
    setVisible(!visible);
  };
  const onNo = () => {
    setVisible(!visible);
  };

  return (
    <Modal
      style={[t.flex, t.alignCenter, t.wFull, t.hFull]}
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View
        style={[
          t.flex,
          t.alignCenter,
          t.wFull,
          t.hFull,
          t.justifyCenter,
          t.alignCenter,
          { backgroundColor: "rgba(52, 52, 52, 0.6)" },
        ]}
      >
        <View
          style={[
            t.bgWhite,
            t.w3_4,
            t.p10,
            t.roundedLg,
            t.flex,
            t.justifyCenter,
            t.alignCenter,
            t.mL12,
          ]}
        >
          <Text style={[t.textLg, t.textCenter]}>
            Send {username} an access STD status request?
          </Text>
          <View
            style={[t.flex, t.flexRow, t.justifyCenter, t.alignCenter, t.mT10]}
          >
            <TouchableHighlight
              style={[t.bgTeal500, t.roundedFull, t.mR6]}
              onPress={onYes}
            >
              <Text
                style={[
                  t.textLg,
                  t.textWhite,
                  t.fontBold,
                  t.uppercase,
                  t.pX8,
                  t.pY2,
                  t.textCenter,
                ]}
              >
                Yes
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[t.bgWhite, t.roundedFull, t.border2]}
              onPress={onNo}
            >
              <Text
                style={[
                  t.textLg,
                  t.textBlack,
                  t.fontBold,
                  t.uppercase,
                  t.pX8,
                  t.pY2,
                  t.textCenter,
                ]}
              >
                No
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};
