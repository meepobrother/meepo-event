import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild, ElementRef, ChangeDetectorRef, Injector
} from '@angular/core';
import { SocketService } from '../../src/app/app';
import { ROUTES } from '@angular/router';
let i: number = 0;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public socket: SocketService
  ) {
    setInterval(() => {
      this.socket.broadcast({ test: 'test' + i });
      i++;
    }, 1000);
  }
}
