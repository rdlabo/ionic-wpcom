import { Action } from '@ngrx/store';

export const REGISTER = 'REGISTER';
export const DELETE = 'DELETE';

export const searchReducer = (keyword:string = '', action: Action) => {
    switch (action.type) {
        case REGISTER:
            return action.payload;
        case DELETE:
            return '';
        default:
            return keyword;
    }
};


