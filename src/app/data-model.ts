export interface IAccount {
  username: string,
  password: string,
  loggedIn: boolean
}

export interface IChat {
  messages: IMessage[];
}

export interface IMessage {
  text: string;
  status: CHAT_STATUS;
}

export enum CHAT_STATUS {
  RECEIVED = 1,
  SENT = 0,
}

export interface IRequestFailed {
  code: RequestCode;
  reason: String;
}
export enum RequestCode {
  FORBIDDEN = 403,
}


