export interface IChat {
  chatWith: string;
  messages: IMessage[];
}

export interface IAccount {
  username: string;
  password: string;
  loggedIn: boolean;
  chats: IChat[];
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


