import { SearchUserListItem } from "./SearchUserListItem";
import { Text, View, TextInput, TouchableHighlight } from "react-native";
import { t, color } from "react-native-tailwindcss";
import { MaterialIcons } from "@expo/vector-icons";
import useSearchUsers from "../hooks/useSearchUsers";

export const SearchUsers = ({ navigation }) => {
  const { users, setQuery, isLoading, query } = useSearchUsers();

  const onQueryChange = (text) => {
    if (text.length > 2) {
      setQuery(text);
    } else if (text.length == 0) {
      setQuery("");
    }
  };

  return (
    <View
      style={[{ backgroundColor: "#F3F7F7" }, t.hFull, t.wFull, t.p8, t.pT20]}
    >
      <TouchableHighlight
        onPress={() => {
          navigation.goBack();
        }}
        underlayColor={color.white}
        style={[t.mB4, t._mL2, t.roundedLg]}
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
        onChangeText={onQueryChange}
        style={[
          t.wFull,
          t.p3,
          t.bgWhite,
          t.roundedLg,
          t.textLg,
          t.border2,
          t.borderTeal500,
          t.mB8,
          t.textGray700,
        ]}
      />
      {!isLoading &&
        users.map((user, index) => (
          <SearchUserListItem
            username={user.username}
            id={user.id}
            key={index}
          />
        ))}
      {!isLoading && users.length === 0 && (
        <Text style={[t.textGray700]}>
          There are no users that start with "{query}"
        </Text>
      )}
    </View>
  );
};
