import { ActionReducerMap } from '@ngrx/store';
import { reducer as searchReducer } from './search';
import { reducer as currentReducer } from './current';
import { AppState } from '../interfaces/store';

export const reducers: ActionReducerMap<AppState> = {
    search: searchReducer,
    current: currentReducer
};
