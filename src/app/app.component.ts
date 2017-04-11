import { Component } from '@angular/core';
import { Thread } from './redux/thread/Thread';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ThreadActions } from './redux/thread/actions';
import { AppState } from './redux/app.reducer';
import { ChatExampleData } from './data/data';
import { UserActions } from './redux/user/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserActions, ThreadActions]
})
export class AppComponent {

  constructor(private store: NgRedux<AppState>, u: UserActions, t: ThreadActions) {
    ChatExampleData(store, u, t);
  }

}
