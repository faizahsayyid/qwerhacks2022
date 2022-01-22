import { useState } from "react";

const useSignUp = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    // Login logic
  };

  return { handleUsernameChange, handlePasswordChange, handleSignUp };
};

export default useSignUp;
