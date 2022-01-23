import React,{useEffect} from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { t } from "react-native-tailwindcss";

export const Landing = ({navigation}) => {
  return (
    <View style={[t.flex, t.hFull, t.wFull, t.justifyCenter, t.itemsCenter]}>
      <Text style={[t.text5xl, t.fontBold, t.textTeal500]}>STDetector</Text>
      {/* <Image
        source={require("../assets/undraw_spread_love_r9jb.png")}
        width={undefined}
        height={undefined}
        resizeMode="contain"
        // style={[{ flex: 1, aspectRatio: 1.5, resizeMode: "contain" }]}
      /> */}
      <TouchableOpacity style={[t.bgTeal500, t.w3_4, t.pY5, t.roundedFull, t.mT12]} onPress={()=>{navigation.navigate('Login Page')}}>
        <Text
          style={[t.uppercase, t.textWhite, t.fontBold, t.textCenter, t.textLg]}
        >
          Log in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          t.bgWhite,
          t.w3_4,
          t.pY5,
          t.roundedFull,
          t.border2,
          t.borderTeal500,
          t.mY5,
        ]}
        onPress={()=>{navigation.navigate('Signup Page')}}
      >
        <Text
          style={[
            t.uppercase,
            t.textTeal500,
            t.fontBold,
            t.textCenter,
            t.textLg,
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};
