import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { EventService, WinEventService } from '../../src/app/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public event: EventService,
    public winEvent: WinEventService
  ) {
    // 监听网络变化
    this.event.subscribe('online', () => {
      console.log('online');
    });
    this.event.subscribe('offline', () => {
      console.log('offline');
    });
    // 监听翻转手机
    this.event.subscribe('rotated', () => {
      console.log('rotated');
    });
  }
  test() {
    this.event.subscribe('test', (test) => {
      console.log(test);
    });
    setTimeout(() => {
      this.event.publish('test', { id: 1 });
    }, 1000);
    setTimeout(() => {
      this.event.publish('test', { id: 1 });
    }, 2000);

    setTimeout(() => {
      
    });
  }
}
