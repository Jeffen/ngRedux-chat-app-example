import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Store } from 'redux';

import { ThreadActions } from '../redux/thread/actions';
import { Thread } from '../redux/thread/Thread';
import { getAllThreads, getCurrentThread } from '../redux/thread/reducer';
import { AppState } from '../redux/app.reducer';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css'],
  providers: [ThreadActions]
})
export class ChatThreadsComponent implements OnInit {
  threads: Thread[];
  currentThreadId: string;

  constructor(private store: NgRedux<AppState>, private actions: ThreadActions) {}

  ngOnInit() {
    this.updateState();
    this.store.subscribe(() => {
      this.updateState();
    });
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(this.actions.selectThread(thread));
  }

  updateState() {
    const state = this.store.getState();
    this.threads = getAllThreads(state);
    this.currentThreadId = getCurrentThread(state).id;
  }
}
