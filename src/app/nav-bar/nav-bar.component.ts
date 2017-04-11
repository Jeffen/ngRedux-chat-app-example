import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../services/message.service';
import { AppState } from '../redux/app.reducer';
import { ThreadActions } from '../redux/thread/actions';
import { getUnreadMessagesCount } from '../redux/thread/reducer';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  unreadMessages: number;

  constructor(private store: NgRedux<AppState>, private action: ThreadActions) { }

  ngOnInit() {
    this.store.subscribe(() => {
      this.updateState();
    });
    this.updateState();
  }

  updateState() {
    const state = this.store.getState();
    this.unreadMessages = getUnreadMessagesCount(state);
  }
}
