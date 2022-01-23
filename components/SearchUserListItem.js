import { Text, View, TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { t, color } from "react-native-tailwindcss";
import { useState } from "react";
import { SendRequestModal } from "./SendRequestModal";

export const SearchUserListItem = ({ username, id }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SendRequestModal
        visible={modalVisible}
        setVisible={setModalVisible}
        username={username}
        id={id}
      />
      <TouchableHighlight
        style={[
          t.flex,
          t.flexRow,
          t.justifyBetween,
          t.itemsCenter,
          t.wFull,
          t.bgWhite,
          t.p4,
          t.roundedLg,
          t.mB2,
        ]}
        underlayColor={color.gray100}
        onPress={() => setModalVisible(true)}
      >
        <>
          <Text style={[t.textLg, t.textGray700]}>{username}</Text>
          <MaterialIcons name="chevron-right" size={24} color={color.gray700} />
        </>
      </TouchableHighlight>
    </>
  );
};
