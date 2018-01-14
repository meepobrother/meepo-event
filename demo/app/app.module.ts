import { BrowserModule } from '@angular/platform-browser';
import { NgModule, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SocketRoom, SocketModule } from 'meepo-event';
import { IndexModule } from './index/index';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: '',
      pathMatch: 'full',
      redirectTo: 'index'
    }], { useHash: true }),
    IndexModule,
    SocketModule.forRoot(),
    SocketModule.forRoot(),
    SocketModule.forRoot(),
    SocketModule.forRoot(),
    SocketModule.forRoot(),
    SocketModule.forRoot(),
    SocketModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
