import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { Thread } from './Thread';
import { Message } from '../message/Message';
import { uuid } from '../../data/uuid';


export interface AddThreadAction extends Action {
    thread: Thread;
}
export interface AddMessageAction extends Action {
    thread: Thread;
    message: Message;
}
export interface SelectThreadAction extends Action {
  thread: Thread;
}

@Injectable()
/**
 * ThreadActions
 */
export class ThreadActions {
    static ADD_THREAD = 'ADD_THREAD';
    static ADD_MESSAGE = 'ADD_MESSAGE';
    static SELECT_THREAD = 'SELECT_THREAD';

    addThread(thread: Thread): AddThreadAction {
        return {
            type: ThreadActions.ADD_THREAD,
            thread: thread
        };
    }

    addMessage(thread: Thread, messageArgs: Message): AddMessageAction {
        const defaults = {
            id: uuid(),
            sentAt: new Date(),
            isRead: false,
            thread: thread
        };
        const message: Message = Object.assign({}, defaults, messageArgs);
        return {
            type: ThreadActions.ADD_MESSAGE,
            message: message,
            thread: thread
        };
    }

    selectThread(thread: Thread): SelectThreadAction {
        return {
            type: ThreadActions.SELECT_THREAD,
            thread: thread
        };
    }
}

