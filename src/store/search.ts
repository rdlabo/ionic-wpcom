import { Action } from '@ngrx/store';

export const REGISTER = 'REGISTER';

export const searchReducer = (keyword:string = '', action: Action) => {
    switch (action.type) {
        case REGISTER:
            return action.payload;
        default:
            return keyword;
    }
}


