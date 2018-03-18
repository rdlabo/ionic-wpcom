import { ActionReducerMap } from '@ngrx/store';
import { reducer as searchReducer } from './search';
import { reducer as currentReducer } from './current';
import { AppStateInterface } from '../interface/store';

export const reducers: ActionReducerMap<AppStateInterface> = {
    search: searchReducer,
    current: currentReducer
};
