import { StoreonModule } from "storeon";
import { IStoreEvents, StringOrNull } from ".";

export interface IUser {
  username: StringOrNull;
  email: StringOrNull;
}

export type IStates = IUser;

export interface IEvents {
  "user/setUsername": string;
  "user/setEmail": string;
  "user/setUser": IUser;
}

const DEFAULT_USER_STATES: IStates = {
  username: null,
  email: null,
};
export const userInfoModule: StoreonModule<IStates, IStoreEvents> = (store) => {
  store.on("@init", () => DEFAULT_USER_STATES);

  store.on("user/setEmail", (state, email) => ({ ...state, email }));

  store.on("user/setUsername", (state, username) => ({ ...state, username }));
  store.on("user/setUser", (state, { username, email }) => {
    return {
      ...state,
      username,
      email,
    };
  });
};
