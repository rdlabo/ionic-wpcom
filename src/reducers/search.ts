import { Action } from '@ngrx/store';
import { ISearch } from '../interfaces/store';

export class createAction implements Action {
    readonly type = 'SEARCH';
    constructor(public payload: ISearch) {}
}

export class deleteAction implements Action {
    readonly type = 'SEARCH_DELETE';
    constructor(public payload: ISearch) {}
}
export type CustomAction = createAction | deleteAction;

export const REGISTER = 'SEARCH';
export const DELETE = 'SEARCH_DELETE';
export const searchDefault = {
    keyword: null
};

export function reducer(state:ISearch = searchDefault, action: CustomAction) {
    switch (action.type) {
        case REGISTER:
            return action.payload;
        case DELETE:
            return null;
        default:
            return state;
    }
}

