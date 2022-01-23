import { useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import base from "../airtable";

const useLogin = (navigation) => {
  const { setUserId, setIsLoggedIn, setUsername } = useContext(GlobalContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUsernameChange = (text) => {
    setUserName(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    base("Users")
      .select({
        view: "Grid view",
        filterByFormula: `{username} = "${username}"`,
      })
      .firstPage((err, records) => {
        if (records && records[0] && records[0].get("password") === password) {
          setUserId(records[0].get("id"));
          setIsLoggedIn(true);
          setUsername(username);
          navigation.navigate("Search Users");
        } else {
          setError(true);
        }
      });
  };

  return { handleUsernameChange, handlePasswordChange, handleLogin, error };
};

export default useLogin;
