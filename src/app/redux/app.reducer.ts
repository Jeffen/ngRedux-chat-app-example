import { Action, combineReducers, Reducer } from 'redux';
import { UsersState, UserReducer, UserInitialState } from './user/reducer';
import { ThreadState, ThreadReducer, ThreadInitialState } from './thread/reducer';

export interface AppState {
    users: UsersState;
    threads: ThreadState;
}

export const INITIAL_STATE = {
    users: UserInitialState,
    threads: ThreadInitialState
};

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    users: UserReducer,
    threads: ThreadReducer
});

