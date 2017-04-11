import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Thread } from '../redux/thread/Thread';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from '../redux/app.reducer';
import { getAllThreads } from '../redux/thread/reducer';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread ;
  @Input() selected: boolean;
  @Output() onThreadSelected: EventEmitter<Thread>;
  unreadMessages = 0;

  constructor() {
    this.onThreadSelected = new EventEmitter<Thread>();
  }

  ngOnInit() {
    this.updateState();
  }

  updateState() {
    this.unreadMessages = this.thread.messages.reduce((unreadCount, message) => {
      if (!message.isRead) {
        ++unreadCount;
      }
      return unreadCount;
    }, 0);
  }

  clicked(event: any): void {
    this.onThreadSelected.emit(this.thread);
    event.preventDefault();
  }
}
