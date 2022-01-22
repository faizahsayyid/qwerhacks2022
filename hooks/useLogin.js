import { useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const useLogin = () => {
  const { setUserId } = useContext(GlobalContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Login logic
  };

  return { handleUsernameChange, handlePasswordChange, handleLogin };
};

export default useLogin;
