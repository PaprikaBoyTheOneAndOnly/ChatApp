export interface IAccount {
  username: string;
  password: string;
  loggedIn: boolean;
  uuid: string;
}

export interface IMessage {
  from: string;
  to: string;
  text: string;
}


export interface IRequestFailed {
  code: RequestCode;
  reason: String;
}

export enum RequestCode {
  FORBIDDEN = 403,
}


