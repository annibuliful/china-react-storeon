import { StoreonModule } from "storeon";

export interface IStates {
  isAuthenticated: boolean;
}

export interface IEvents {
  setIsAuthenticated: boolean;
}

const DEFAULT_AUTH_STATES: IStates = {
  isAuthenticated: false,
};

export const authModule: StoreonModule<IStates, IEvents> = (store) => {
  store.on("@init", () => DEFAULT_AUTH_STATES);
  store.on("setIsAuthenticated", (state, isAuth) => ({
    ...state,
    isAuthenticated: isAuth,
  }));
};
