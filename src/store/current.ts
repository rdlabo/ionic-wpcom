import { Action } from '@ngrx/store';
import { InterfaceCurrent } from '../interface/store';

export const REGISTER = 'REGISTER_Current';
export const DELETE = 'DELETE_Current';

export const currentReducer = (current:InterfaceCurrent = { page:null, opt:null}, action: Action) => {
    switch (action.type) {
        case REGISTER:
            return action.payload;
        case DELETE:
            return '';
        default:
            return current;
    }
};


