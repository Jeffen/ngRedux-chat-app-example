import { Component, OnInit, ElementRef } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../redux/user/User';
import { AppState } from '../redux/app.reducer';
import { ThreadActions } from '../redux/thread/actions';
import { Thread } from '../redux/thread/Thread';
import { getCurrentThread } from '../redux/thread/reducer';
import { getCurrentUser } from '../redux/user/reducer';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  currentThread: Thread;
  currentUser: User;
  close: boolean;
  draftMessage: { text: string };


  constructor(private store: NgRedux<AppState>, private thread: ThreadActions, private el: ElementRef) {}

  ngOnInit() {
    this.draftMessage = { text: '' };
    this.updateState();
    this.store.subscribe(() => {
      this.updateState();
    });
  }

  updateState() {
    const state = this.store.getState();
    this.currentThread = getCurrentThread(state);
    this.currentUser = getCurrentUser(state);
    this.scrollToBottom();
  }

  togglePanel(state?) {
    if (state && !this.close) {
      return false;
    }
    this.close = !this.close;
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (!this.close) {
      const scrollPane: any = this.el
        .nativeElement.querySelector('.msg-container-base');
      if (scrollPane) {
        setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
      }
    }
  }

  sendMessage() {
    if (!this.draftMessage.text) {
      return false;
    }
          this.store.dispatch(this.thread.addMessage(
      this.currentThread,
      {
        author: this.currentUser,
        isRead: true,
        text: this.draftMessage.text
      }
    ));
    this.draftMessage = { text: '' };
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }
}
