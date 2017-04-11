import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Message } from '../redux/message/Message';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  incoming: boolean;

  constructor() { }

  ngOnInit() {
    this.incoming = !this.message.author.isClient;
  }

}
