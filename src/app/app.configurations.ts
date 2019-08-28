import {createFeatureSelector, createSelector} from '@ngrx/store';

const serverPort: number = 8090;

export interface IConfigState {
  serverPort: number;
}

const initialState:IConfigState = {
  serverPort,
};

export function reducer(state = initialState) {
  return state;
}

const getConfigState = createFeatureSelector<IConfigState>('config');

export const getServerPort = createSelector(
  getConfigState,
  state => state.serverPort
)
