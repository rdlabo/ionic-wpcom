import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../interfaces/store';
import { reducer as currentReducer } from './current';
import { reducer as searchReducer } from './search';

export const reducers: ActionReducerMap<IAppState> = {
  search: searchReducer,
  current: currentReducer,
};
