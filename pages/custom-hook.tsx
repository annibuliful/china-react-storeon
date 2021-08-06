import React, { useMemo } from "react";
import { useAppStore } from "../store";
import { SetUserForm, ToggleAuthWithStore } from "./store";

const useGetStoreState = () => {
  const { username, email, isAuthenticated } = useAppStore(
    "email",
    "isAuthenticated",
    "username"
  );

  return useMemo(
    () => ({ username, email, isAuthenticated }),
    [username, email, isAuthenticated]
  );
};

const DisplayAuthFlag = () => {
  const { isAuthenticated } = useGetStoreState();
  return <p>auth flag: {isAuthenticated}</p>;
};

const DisplayUserInfo = () => {
  const { username, email } = useGetStoreState();
  return (
    <div>
      <p>username: {username}</p>
      <p>email: {email}</p>
    </div>
  );
};
const CustomHook = () => {
  return (
    <div>
      <SetUserForm />
      <DisplayUserInfo />
      <br />
      <br />
      <br />
      <ToggleAuthWithStore />
      <DisplayAuthFlag />
    </div>
  );
};

export default CustomHook;
