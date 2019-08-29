import {IAccount} from '../data-model';
import {LoginActions, LoginActionTypes} from './login.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface IClientState {
  account: IAccount,
}

const initialClientState: IClientState = {
  account: JSON.parse(window.sessionStorage.getItem('account')),
};

export function reducer(state = initialClientState, action: LoginActions) {
  switch (action.type) {
    case LoginActionTypes.LOG_IN_USER:
      window.sessionStorage.setItem('account', JSON.stringify(action.payload));
      return {
        ...state,
        account: action.payload
      };
    case LoginActionTypes.LOG_OUT_USER:
      window.sessionStorage.removeItem('account');
      return {
        ...state,
        account: null,
      };
    default:
      return state;
  }
}

const getClientState = createFeatureSelector<IClientState>('client');

export const getAccount = createSelector(
  getClientState,
  state => state.account
);
