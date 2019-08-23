import {IAccount} from "../data-model";
import {UserActions, UserActionTypes} from "./user.action";

export interface IUserState {
  user: IAccount,
}

const initialUserState: IUserState = {
  user: null,
};

export function reducer(state = initialUserState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.LOG_IN_USER:
      return {
        ...state,
        user: action.payload
      };
    case UserActionTypes.LOG_OUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
