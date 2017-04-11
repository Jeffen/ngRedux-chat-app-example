import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from './redux/app.store.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { MessageService } from './services/message.service';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { FromNowPipe } from './services/fromNow.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ChatWindowComponent,
    ChatThreadsComponent,
    ChatThreadComponent,
    ChatMessageComponent,
    FromNowPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
