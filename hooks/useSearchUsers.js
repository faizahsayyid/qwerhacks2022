import React, { useEffect, useState } from "react";
import base from "../airtable";

const useSearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = () => {
    let newUsers = [];
    setIsLoading(true);
    base("Users")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        newUsers = [
          ...newUsers,
          ...records.map((record) => {
            return record.get("username");
          }),
        ];
        fetchNextPage();
      })
      .then(() => {
        setUsers(newUsers);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (query != "") {
      let newUsers = [];
      setIsLoading(true);
      base("Users")
        .select({
          view: "Grid view",
          filterByFormula: `NOT(FIND("${query}", {username}) = 0)`,
        })
        .eachPage((records, fetchNextPage) => {
          newUsers = [
            ...newUsers,
            ...records.map((record) => {
              return record.get("username");
            }),
          ];
          fetchNextPage();
        })
        .then(() => {
          setUsers(newUsers);
          setIsLoading(false);
        });
    } else {
      getAllUsers();
    }
  }, [query]);

  return { users, setQuery, isLoading, query };
};

export default useSearchUsers;
