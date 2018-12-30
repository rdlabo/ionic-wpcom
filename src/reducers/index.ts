import { ActionReducerMap } from '@ngrx/store';
import { reducer as searchReducer } from './search';
import { reducer as currentReducer } from './current';
import { IAppState } from '../interfaces/store';

export const reducers: ActionReducerMap<IAppState> = {
  search: searchReducer,
  current: currentReducer,
};
