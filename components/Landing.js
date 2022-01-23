import React,{useEffect} from "react";
import { Text, View, TouchableOpacity, Image,Dimensions } from "react-native";
import { t } from "react-native-tailwindcss";

export const Landing = ({navigation}) => {
  return (
    <View style={[t.flex, t.hFull, t.wFull, t.justifyCenter, t.itemsCenter, t.bgWhite]}>
      <Image
        source={require("../assets/undraw_spread_love_r9jb.png")}
        width={Dimensions.get('window').width}
        height={Dimensions.get('screen').height}
        resizeMode="center"
        style={[t.relative]}
      />
      <Text style={[t.text5xl, t.fontBold, t.textTeal500,t.absolute,t.top0, t.mY32]}>STDetector</Text>
      
      <TouchableOpacity style={[t.bgTeal500, t.w3_4, t.pY5, t.roundedFull, t.absolute,t.bottom0, t.mB40]} onPress={()=>{navigation.navigate('Login Page')}}>
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
          t.absolute,t.bottom0, t.mB20
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
