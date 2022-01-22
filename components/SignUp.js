import { Text, View, Pressable } from "react-native";
import { t } from "react-native-tailwindcss";
import { LoginSignUpForm } from "./LoginSignUpForm";
import useSignUp from "../hooks/useSignUp";

export const SignUp = () => {
  const { handleUsernameChange, handlePasswordChange, handleSignUp } =
    useSignUp();

  return (
    <View
      style={[
        t.hFull,
        t.wFull,
        t.flex,
        t.justifyEnd,
        t.itemsCenter,
        t.bgTeal100,
      ]}
    >
      <View style={[t.w3_4, t.flex, t.justifyCenter, t.itemsStart]}>
        <Text style={[t.text4xl, t.textTeal500, t.fontBold, t.mB10]}>
          Sign Up
        </Text>
        <LoginSignUpForm
          onPasswordChange={handlePasswordChange}
          onUsernameChange={handleUsernameChange}
        />
        <Pressable
          style={[t.bgTeal500, t.wFull, t.rounded, t.pY3, t.mY32]}
          onPress={handleSignUp}
        >
          <Text
            style={[
              t.textWhite,
              t.uppercase,
              t.fontBold,
              t.textCenter,
              t.textLg,
            ]}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
