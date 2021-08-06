import { InputEvent } from ".";
import { useAppStore } from "../store";
import { IEvents as IUserEvents } from "../store/userInfo";

const SetUserForm = () => {
  const {
    username: storeUsername,
    email: storeEmail,
    dispatch,
  } = useAppStore("email", "username");

  const handleChangeInputValue =
    (actionName: keyof IUserEvents) => (e: InputEvent) => {
      dispatch(actionName, e.target.value);
    };

  const handleSetUser = () => {
    dispatch("user/setUser", { username: storeUsername, email: storeEmail });
  };
  return (
    <div>
      <input
        placeholder="username"
        value={storeUsername as string}
        onChange={handleChangeInputValue("user/setUsername")}
      />
      <input
        placeholder="email"
        value={storeEmail as string}
        onChange={handleChangeInputValue("user/setEmail")}
      />
      <button onClick={handleSetUser}>setUser and Auth flag</button>
    </div>
  );
};

const ToggleAuthWithStore = () => {
  const { isAuthenticated, dispatch } = useAppStore("isAuthenticated");

  return (
    <button onClick={() => dispatch("setIsAuthenticated", !isAuthenticated)}>
      toggle auth with store
    </button>
  );
};

interface IToggleAutWithoutStoreProps {
  toggleAuth: () => void;
}
// prop drilling issue
const ToggleAuthWithoutStore = ({
  toggleAuth,
}: IToggleAutWithoutStoreProps) => {
  return <button onClick={toggleAuth}>toggle auth without store</button>;
};

const StorePage = () => {
  const { isAuthenticated, dispatch, email, username } = useAppStore(
    "isAuthenticated",
    "email",
    "username"
  );

  const toggleAuth = () => {
    dispatch("setIsAuthenticated", !isAuthenticated);
  };
  return (
    <div>
      <ToggleAuthWithStore />
      <ToggleAuthWithoutStore toggleAuth={toggleAuth} />
      <p>is auth flag: {`${isAuthenticated}`}</p>
      <br />
      <br />
      <br />
      <SetUserForm />
      <p>username value: {username}</p>
      <p>email: value: {email}</p>
    </div>
  );
};

export default StorePage;
