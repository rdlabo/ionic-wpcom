import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';

import { combineReducers } from '@ngrx/store';
import { searchReducer } from './search';
import { currentReducer } from './current';

const reducers = {
    search: searchReducer,
    current: currentReducer
};

const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return productionReducer(state, action);
}