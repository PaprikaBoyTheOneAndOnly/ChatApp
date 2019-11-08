export interface IChat {
  chatWith: string;
  addressableList: IAddressable[];
}

export interface IAccount {
  username: string;
  password: string;
  loggedIn: boolean;
  chats: IChat[];
}

export interface IAddressable {
  from: string;
  to: string;
}

export interface IFile extends IAddressable {
  filename: string;
  originalFilename: string;
  mediaType: string;
}
export interface IMessage extends IAddressable {
  text: string;
}

export enum Icon {
  FILE = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNMzUyLjQ1OSwyMjBjMC0xMS4wNDYtOC45NTQtMjAtMjAtMjBoLTIwNmMtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjBzOC45NTQsMjAsMjAsMjBoMjA2ICAgICBDMzQzLjUwNSwyNDAsMzUyLjQ1OSwyMzEuMDQ2LDM1Mi40NTksMjIweiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMTI2LjQ1OSwyODBjLTExLjA0NiwwLTIwLDguOTU0LTIwLDIwYzAsMTEuMDQ2LDguOTU0LDIwLDIwLDIwSDI1MS41N2MxMS4wNDYsMCwyMC04Ljk1NCwyMC0yMGMwLTExLjA0Ni04Ljk1NC0yMC0yMC0yMCAgICAgSDEyNi40NTl6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik0xNzMuNDU5LDQ3MkgxMDYuNTdjLTIyLjA1NiwwLTQwLTE3Ljk0NC00MC00MFY4MGMwLTIyLjA1NiwxNy45NDQtNDAsNDAtNDBoMjQ1Ljg4OWMyMi4wNTYsMCw0MCwxNy45NDQsNDAsNDB2MTIzICAgICBjMCwxMS4wNDYsOC45NTQsMjAsMjAsMjBjMTEuMDQ2LDAsMjAtOC45NTQsMjAtMjBWODBjMC00NC4xMTItMzUuODg4LTgwLTgwLTgwSDEwNi41N2MtNDQuMTEyLDAtODAsMzUuODg4LTgwLDgwdjM1MiAgICAgYzAsNDQuMTEyLDM1Ljg4OCw4MCw4MCw4MGg2Ni44ODljMTEuMDQ2LDAsMjAtOC45NTQsMjAtMjBDMTkzLjQ1OSw0ODAuOTU0LDE4NC41MDUsNDcyLDE3My40NTksNDcyeiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNNDY3Ljg4NCwyODkuNTcyYy0yMy4zOTQtMjMuMzk0LTYxLjQ1OC0yMy4zOTUtODQuODM3LTAuMDE2bC0xMDkuODAzLDEwOS41NmMtMi4zMzIsMi4zMjctNC4wNTIsNS4xOTMtNS4wMSw4LjM0NSAgICAgbC0yMy45MTMsNzguNzI1Yy0yLjEyLDYuOTgtMC4yNzMsMTQuNTU5LDQuODIxLDE5Ljc4YzMuODE2LDMuOTExLDksNi4wMzQsMTQuMzE3LDYuMDM0YzEuNzc5LDAsMy41NzUtMC4yMzgsNS4zMzgtMC43MjcgICAgIGw4MC43MjUtMjIuMzYxYzMuMzIyLTAuOTIsNi4zNS0yLjY4Myw4Ljc5LTUuMTE5bDEwOS41NzMtMTA5LjM2N0M0OTEuMjc5LDM1MS4wMzIsNDkxLjI3OSwzMTIuOTY4LDQ2Ny44ODQsMjg5LjU3MnogICAgICBNMzMzLjc3Niw0NTEuNzY4bC00MC42MTIsMTEuMjVsMTEuODg1LTM5LjEyOWw3NC4wODktNzMuOTI1bDI4LjI5LDI4LjI5TDMzMy43NzYsNDUxLjc2OHogTTQzOS42MTUsMzQ2LjEzbC0zLjg3NSwzLjg2NyAgICAgbC0yOC4yODUtMjguMjg1bDMuODYyLTMuODU0YzcuNzk4LTcuNzk4LDIwLjQ4Ni03Ljc5OCwyOC4yODQsMEM0NDcuMzk5LDMyNS42NTYsNDQ3LjM5OSwzMzguMzQ0LDQzOS42MTUsMzQ2LjEzeiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMzMyLjQ1OSwxMjBoLTIwNmMtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjBzOC45NTQsMjAsMjAsMjBoMjA2YzExLjA0NiwwLDIwLTguOTU0LDIwLTIwUzM0My41MDUsMTIwLDMzMi40NTksMTIweiIgZmlsbD0iIzAwMDAwMCIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K',
}
