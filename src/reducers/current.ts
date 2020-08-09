import { Action } from '@ngrx/store';
import { ICurrent } from '../interfaces/store';

export class CreateMehod implements Action {
  public readonly type = 'CURRENT';
  constructor(public payload: ICurrent) {}
}
export type CustomAction = CreateMehod;

export const REGISTER = 'CURRENT';
export const currentDefault = {
  page: null,
  opt: null,
};

export function reducer(state: ICurrent = currentDefault, action: CustomAction) {
  switch (action.type) {
    case REGISTER:
      return action.payload;
    default:
      return state;
  }
}
