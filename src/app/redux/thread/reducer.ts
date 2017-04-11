import { Thread } from './Thread';
import { Action } from 'redux';
import * as I from 'immutable';
import { ThreadActions, AddThreadAction, AddMessageAction, SelectThreadAction } from './actions';
import { Message } from '../message/Message';
import { createSelector } from 'reselect';

export interface ThreadsEntities {
    [id: string]: Thread;
}

export interface ThreadState {
    ids: string[];
    entities: ThreadsEntities;
    currentThreadId?: string;
};

export const ThreadInitialState: ThreadState = {
    ids: [],
    currentThreadId: null,
    entities: {}
};

export function ThreadReducer(state: ThreadState = ThreadInitialState, action: Action): ThreadState {
    switch (action.type) {
        case ThreadActions.ADD_THREAD: {
            const thread: Thread = (<AddThreadAction>action).thread;
            if (state.ids.includes(thread.id)) {
                return state;
            }
            return {
                ids: I.fromJS(state.ids).push(thread.id),
                currentThreadId: state.currentThreadId,
                entities: Object.assign({}, state.entities, {
                    [thread.id]: thread
                })
            };
        };

        case ThreadActions.ADD_MESSAGE: {
            const thread: Thread = (<AddMessageAction>action).thread;
            const message: Message = (<AddMessageAction>action).message;

            const isRead = message.thread.id === state.currentThreadId ?
                true : message.isRead;
            const newMessage = Object.assign({}, message, { isRead: isRead });

            const oldThread = state.entities[thread.id];

            const newThread = Object.assign({}, oldThread, {
                messages: [...oldThread.messages, newMessage]
            });

            return {
                ids: state.ids,
                currentThreadId: state.currentThreadId,
                entities: Object.assign({}, state.entities, {
                    [thread.id]: newThread
                })
            };
        };

        case ThreadActions.SELECT_THREAD: {
            const thread = (<SelectThreadAction>action).thread;
            const oldThread = state.entities[thread.id];

            // mark the messages as read
            const newMessages = oldThread.messages.map(
                (message) => Object.assign({}, message, { isRead: true }));

            // give them to this new thread
            const newThread = Object.assign({}, oldThread, {
                messages: newMessages
            });

            return {
                ids: state.ids,
                currentThreadId: thread.id,
                entities: Object.assign({}, state.entities, {
                [thread.id]: newThread
                })
            };
        }
    }
    return state;
}

export const getThreadsState = (state): ThreadState => state.threads;

export const getThreadsEntities = createSelector(
  getThreadsState,
  ( state: ThreadState ) => state.entities );

export const getAllThreads = createSelector(
  getThreadsEntities,
  ( entities: ThreadsEntities ) => Object.keys(entities)
                        .map((threadId) => entities[threadId]));

export const getUnreadMessagesCount = createSelector(
  getAllThreads,
  ( threads: Thread[] ) => threads.reduce(
      (unreadCount: number, thread: Thread) => {
        thread.messages.forEach((message: Message) => {
          if (!message.isRead) {
            ++unreadCount;
          }
        });
        return unreadCount;
      },
      0));

// This selector emits the current thread
export const getCurrentThread = createSelector(
  getThreadsEntities,
  getThreadsState,
  ( entities: ThreadsEntities, state: ThreadState ) =>
    entities[state.currentThreadId] );

export const getAllMessages = createSelector(
  getAllThreads,
  ( threads: Thread[] ) =>
    threads.reduce( // gather all messages
      (messages, thread) => [...messages, ...thread.messages],
      []).sort((m1, m2) => m1.sentAt - m2.sentAt)); // sort them by time
