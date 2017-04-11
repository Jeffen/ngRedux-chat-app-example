import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { User } from './User';

export interface SetCurrentUserAction extends Action {
    user: User;
}

@Injectable()

export class UserActions {
    static SET_CURRENT_USER = 'SET_CURRENT_USER';

    setCurrentUser(user: User): SetCurrentUserAction {
        return {
            type: UserActions.SET_CURRENT_USER,
            user: user
        };
    }
}
