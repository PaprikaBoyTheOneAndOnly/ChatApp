import {Action} from "@ngrx/store";
import {IAccount} from "../data-model";

export enum UserActionTypes {
  LOG_IN_USER = 'LOG_IN_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
}

export class LogInUser implements Action {
  readonly type = UserActionTypes.LOG_IN_USER;

  constructor(public payload:IAccount) {
  }
}

export class LogOutUser implements Action {
  readonly type = UserActionTypes.LOG_OUT_USER;
}

export type UserActions =
  | LogInUser
  | LogOutUser;
