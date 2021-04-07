import { User } from "./../interfaces/Data";
const tokenKey: string = "google-id-token";

export const getAuthHeaders = (user: User | null, token: string = "") => {
  return {
    tokenid: token || getAuthToken(user),
    "Content-Type": "application/json",
  };
};

export const clearAuthToken = () => {
  localStorage.removeItem(tokenKey);
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

const getAuthToken = (user: User | null) => {
  return localStorage.getItem(tokenKey) || user?.token || "";
};
