import { Text, View, TouchableHighlight } from "react-native";
import { t } from "react-native-tailwindcss";
import { LoginSignUpForm } from "./LoginSignUpForm";
import useLogin from "../hooks/useLogin";

export const Login = ({ navigation }) => {
  const { handleUsernameChange, handlePasswordChange, handleLogin, error } =
    useLogin(navigation);

  return (
    <View
      style={[
        t.hFull,
        t.wFull,
        t.flex,
        t.justifyEnd,
        t.itemsCenter,
        { backgroundColor: "#F3F7F7" },
      ]}
    >
      <View style={[t.w3_4, t.flex, t.justifyCenter, t.itemsStart]}>
        <Text style={[t.text4xl, t.textTeal500, t.fontBold, t.mB10]}>
          Log in
        </Text>
        <LoginSignUpForm
          onPasswordChange={handlePasswordChange}
          onUsernameChange={handleUsernameChange}
        />
        {error && (
          <Text style={[t.textRed500, t.selfCenter]}>
            Username or password is incorrect
          </Text>
        )}
        <TouchableHighlight
          style={[t.bgTeal500, t.wFull, t.roundedFull, t.pY3, t.mY32]}
          onPress={handleLogin}
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
            Log in
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
