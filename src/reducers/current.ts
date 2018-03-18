
import { Action } from '@ngrx/store';
import { Current } from '../interfaces/store';

export class CreateMehod implements Action {
    readonly type = 'CURRENT';
    constructor(public payload: Current) {}
}
export type CustomAction = CreateMehod;

export const REGISTER = 'CURRENT';
export const currentDefault = {
    page: null,
    opt: null
};

export function reducer(state:Current = currentDefault, action: CustomAction) {
    switch (action.type) {
        case REGISTER:
            return action.payload;
        default:
            return state;
    }
}

