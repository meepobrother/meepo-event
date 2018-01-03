import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EventModule } from '../../src/app/app';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EventModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

