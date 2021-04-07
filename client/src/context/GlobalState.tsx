import { State, User } from "../interfaces/Data";
import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import axios from "axios";
import {
  getAuthHeaders,
  clearAuthToken,
  setAuthToken,
} from "../helpers/_localStorage";

// Initial State
const initialState: State = {
  error: null,
  loading: false,
  user: null,
  getUserByEmail: async (user: User) => user,
  getUserByUserName: () => {},
  logOut: () => {},
  processError: () => {},
  addUser: () => {},
  saveGoogleUserInfo: () => {},
  commitUser: () => {},
  updateUser: () => {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function processError(error: any) {
    console.log(error);
    if (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  }

  // Actions

  const verifyTokenIdentity = async (token: string): Promise<User | null> => {
    const config = {
      headers: {
        ...getAuthHeaders(state.user, token),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      const response: { data: { data: User } } = await axios.post(
        `/api/v1/gauth/tokensignin`,
        null,
        config
      );
      return response.data.data;
    } catch (error: any) {
      processError(error);
      return null;
    }
  };

  async function saveGoogleUserInfo(googleUser: any) {
    const id_token: string = googleUser.getAuthResponse().id_token;
    const user: User | null = await verifyTokenIdentity(id_token);

    if (user !== null) {
      user.token = id_token;
      if (!user.userName && user.email) user.userName = user.email;

      const dbUser: User | undefined = await getUserByEmail(user);
      if (dbUser) {
        dbUser.token = id_token;

        await updateUser(dbUser);
        const updatedUser = await getUserByEmail(dbUser);

        if (updatedUser) {
          setAuthToken(updatedUser.token);
          commitUser(updatedUser);
        } else logOut();
      } else {
        const createdUser = await addUser(user);

        if (createdUser) {
          setAuthToken(createdUser.token);
          commitUser(createdUser);
        } else logOut();
      }
    } else logOut();
  }

  async function getUserByUserName(userName: string) {
    try {
      const user: {
        data: { data: User };
      } = await axios.get(`/api/v1/users/username/${userName}`, {
        headers: getAuthHeaders(state.user),
      });
      dispatch({
        payload: user.data.data,
        type: "COMMIT_USER",
      });
    } catch (error: any) {
      processError(error);
    }
  }

  const getUserByEmail = async (user: User): Promise<User | undefined> => {
    try {
      const response: {
        data: { data: User };
      } = await axios.get(`/api/v1/users/email/${user.email}`, {
        headers: getAuthHeaders(user),
      });
      dispatch({
        payload: response.data.data,
        type: "COMMIT_USER",
      });
      return response.data.data;
    } catch (error: any) {
      processError(error);
    }
  };

  const addUser = async (user: User): Promise<User | undefined> => {
    try {
      const response: { data: { data: User } } = await axios.post(
        `/api/v1/users`,
        user,
        {
          headers: getAuthHeaders(user),
        }
      );
      return response.data.data;
    } catch (error: any) {
      processError(error);
    }
  };

  const updateUser = async (user: User): Promise<void> => {
    try {
      await axios.put(`/api/v1/users/id/${user.userId}`, user, {
        headers: getAuthHeaders(user),
      });
    } catch (error: any) {
      processError(error);
    }
  };

  const commitUser = async (user: User) => {
    dispatch({
      payload: user,
      type: "COMMIT_USER",
    });
  };

  async function logOut() {
    try {
      clearAuthToken();
      dispatch({
        type: "LOGOUT",
      });
    } catch (error: any) {
      processError(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        user: state.user,
        getUserByUserName,
        getUserByEmail,
        logOut,
        processError,
        addUser,
        saveGoogleUserInfo,
        commitUser,
        updateUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
