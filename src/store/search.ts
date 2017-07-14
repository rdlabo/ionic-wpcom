import { Action } from '@ngrx/store';
import { InterfaceKeyword } from '../interface/store';

export const REGISTER = 'REGISTER_Search';
export const DELETE = 'DELETE_Search';

export const searchReducer = (keyword:InterfaceKeyword = { keyword: ''} , action: Action) => {
    switch (action.type) {
        case REGISTER:
            return action.payload;
        case DELETE:
            return '';
        default:
            return keyword;
    }
};


