import { Action } from 'redux';
import { createSelector } from 'reselect';
import { User } from './User';
import { UserActions, SetCurrentUserAction } from './actions';


export interface UsersState {
    currentUser: User;
};

export const UserInitialState: UsersState = {
    currentUser: null
};

export function UserReducer(state: UsersState = UserInitialState, action: Action): UsersState {
    switch (action.type) {
        case UserActions.SET_CURRENT_USER:
            const user: User = (<SetCurrentUserAction>action).user;
            return { currentUser: user };
    }
    return state;
}

export const getUsersState = (state): UsersState => state.users;

export const getCurrentUser = createSelector(
    getUsersState,
    ( state: UsersState) => state.currentUser
);
