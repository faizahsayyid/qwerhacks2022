import { t, color } from "react-native-tailwindcss";
import { Text, TextInput } from "react-native";

export const LoginSignUpForm = ({ onUsernameChange, onPasswordChange }) => {
  return (
    <>
      <Text style={label}>Username</Text>
      <TextInput style={input} onChange={onUsernameChange} />
      <Text style={label}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={input}
        onChange={onPasswordChange}
      />
    </>
  );
};

const label = [t.textTeal400, t.uppercase, t.fontBold, t.textLg, t.mB2];
const input = [
  t.wFull,
  t.dropShadow,
  t.appearanceNone,
  t.rounded,
  t.border,
  t.borderTeal400,
  t.textXl,
  t.p3,
  t.mB8,
  t.bgWhite,
];
