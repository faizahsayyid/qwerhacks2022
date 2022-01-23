import { useState } from "react";
import base from "../airtable";

const useSignUp = (navigation) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const handleUsernameChange = (text) => {
    setUserName(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignUp = () => {
    base("Users")
      .select({
        view: "Grid view",
        filterByFormula: `{username} = "${username}"`,
      })
      .firstPage((err, records) => {
        if (records && records.length !== 0) {
          setError("User with that username already exists!");
        } else {
          setError(null);
          base("Users").create(
            [
              {
                fields: {
                  username: username,
                  password: password,
                },
              },
            ],
            (err, records) => {
              if (err) {
                console.log(err);
                setError("Unable to sign up. Try again.");
                return;
              }
              setError(null);
              setHasSignedUp(true);
              setTimeout(() => {
                navigation.navigate("Dashboard", {
                  id: records[0].get("id"),
                  username,
                  disabled: false,
                });
              }, 500);
            }
          );
        }
      });
  };
  return {
    handleUsernameChange,
    handlePasswordChange,
    handleSignUp,
    error,
    hasSignedUp,
  };
};

export default useSignUp;
