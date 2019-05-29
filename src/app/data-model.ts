export interface IAccount {
  username: string,
  password: string,
  loggedIn: boolean
}

export interface IMessage {
  timestamp: ILocalDateTime;
  message: string;
}

export interface IChat {
  receiver: {
    messages: IMessage[];
  };
  sender: {
    messages: IMessage[];
  }
}

export interface ILocalDateTime {
  date: {
    day: number;
    month: number;
    year: number;
  }
  time: {
    hour: number;
    minute: number;
    nano: number;
    second: number;
  }
}
