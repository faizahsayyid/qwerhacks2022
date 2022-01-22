import React from "react";
import { SearchUserListItem } from "./SearchUserListItem";
import { Text, View, TextInput, TouchableHighlight } from "react-native";
import { t, color } from "react-native-tailwindcss";
import { MaterialIcons } from "@expo/vector-icons";

export const SearchUsers = () => {
  const users = ["fyfy", "indoorliving", "sampull"];
  return (
    <View
      style={[
        t.bgTeal100,
        t.hFull,
        t.wFull,
        t.flex,
        t.justifyCenter,
        t.itemsCenter,
      ]}
    >
      <View
        style={[t.flex, t.justifyStart, t.itemsStart, t.w3_4, t.hFull, t.mT40]}
      >
        <TouchableHighlight
          onPress={() => {}}
          underlayColor={color.gray100}
          style={[t.mB6, t._mL2, t.roundedLg]}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={color.gray700}
            style={[t.p2]}
          />
        </TouchableHighlight>
        <Text style={[t.uppercase, t.fontBold, t.mB4, t.textGray700]}>
          Search By Username
        </Text>
        <TextInput
          style={[
            t.wFull,
            t.p3,
            t.bgWhite,
            t.roundedLg,
            t.textLg,
            t.border2,
            t.borderTeal500,
            t.mB10,
            t.textGray700,
          ]}
          placeholder="hello"
        />
        {users.map((username, index) => (
          <SearchUserListItem username={username} key={index} />
        ))}
      </View>
    </View>
  );
};
