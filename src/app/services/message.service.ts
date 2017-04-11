import { Injectable } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class MessageService {

    @select(['threads', 'entities']) private readonly allMessages$: Observable<any>;

    getUnreadMessagesNumber() {
        console.log('getUnreadMessagesNumber service called');
        this.allMessages$.subscribe(value => {
            console.log('value', value);
        });
    }
}
