import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';

import { combineReducers } from '@ngrx/store';
import { searchReducer } from './search';

const reducers = {
    search: searchReducer,
};

const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return productionReducer(state, action);
}