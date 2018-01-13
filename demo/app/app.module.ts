import { BrowserModule } from '@angular/platform-browser';
import { NgModule, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventModule, SocketRoom, SocketModule } from '../../src/app/app';
import { IndexModule } from './index/index';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EventModule.forRoot(),
    RouterModule.forRoot([{
      path: '',
      pathMatch: 'full',
      redirectTo: 'index'
    }], { useHash: true }),
    IndexModule,
    SocketModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
