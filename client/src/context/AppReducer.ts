import { State, User } from "../interfaces/Data";

type ActionType =
  | {
      type: "COMMIT_USER";
      payload: User;
    }
  | {
      type: "TRANSACTION_ERROR";
      payload: any;
    }
  | {
      type: "LOGOUT";
    };

export const AppReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "COMMIT_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
