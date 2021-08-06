import { createContext } from "react";
import { createStoreon, StoreonModule } from "storeon";
import { customContext } from "storeon/react";
import {
  userInfoModule,
  IEvents as IUserEvents,
  IStates as IUserStates,
} from "./userInfo";
import {
  authModule,
  IEvents as IAuthEvents,
  IStates as IAuthStates,
} from "./auth";

export type StringOrNull = string | null;

export type IStoreStates = IAuthStates & IUserStates;
export type IStoreEvents = IAuthEvents & IUserEvents;

export const store = createStoreon<IStoreStates, IStoreEvents>([
  authModule,
  userInfoModule,
]);

export const CustomStoreContext = createContext(store);

export const useAppStore = customContext(CustomStoreContext);
