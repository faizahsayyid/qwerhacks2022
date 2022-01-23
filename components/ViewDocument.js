import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export const ViewDocument = ({ stdName, status }) => {
  return (
    <View
      style={[
        t.flexRow,
        t.itemsCenter,
        t.justifyBetween,
        t.wFull,
        t.bgWhite,
        t.p6,
        { borderRadius: 24 },
        t.mB2,
      ]}
    >
      <View>
        <Text style={[{ fontFamily: "Inter" }, t.textTeal500, t.text2xl]}>
          {stdName}
        </Text>
        <TouchableOpacity>
          <Text style={[{ fontFamily: "Inter" }, t.textSm, t.textGray700]}>
            {status}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {status === "Positive" ? (
          <TouchableOpacity
            style={[
              t.bgTeal500,
              t.w16,
              t.h16,
              t.roundedFull,
              t.flexRow,
              t.justifyCenter,
              t.itemsCenter,
            ]}
            onPress={onPress}
          >
            <AntDesign name="plus" size={32} color="white" />
          </TouchableOpacity>
        ) : status === "Negative" ? (
          <TouchableOpacity
            style={[
              t.borderTeal500,
              t.borderSolid,
              t.border4,
              t.w16,
              t.h16,
              t.roundedFull,
              t.flexRow,
              t.justifyCenter,
              t.itemsCenter,
            ]}
          >
            <AntDesign name="minus" size={36} color="#14B8A6" />
          </TouchableOpacity>
        ) : (
          <Text style={[{ fontFamily: "Inter" }, t.textGray500]}>Pending</Text>
        )}
      </View>
      <Image />
    </View>
  );
};
