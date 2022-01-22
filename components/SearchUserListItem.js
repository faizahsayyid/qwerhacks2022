import { Text, View, TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { t, color } from "react-native-tailwindcss";

export const SearchUserListItem = ({ username }) => {
  return (
    <TouchableHighlight
      style={[
        t.flex,
        t.flexRow,
        t.justifyBetween,
        t.itemsCenter,
        t.wFull,
        t.bgWhite,
        t.p5,
        t.roundedLg,
        t.mB2,
      ]}
      underlayColor={color.gray100}
      onPress={() => {}}
    >
      <>
        <Text style={[t.textLg, t.textGray700]}>{username}</Text>
        <MaterialIcons name="chevron-right" size={24} color={color.gray700} />
      </>
    </TouchableHighlight>
  );
};
