import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { EventService } from '../../src/app/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public event: EventService
  ) { }
  test() {
    this.event.subscribe('test', (test) => {
      console.log(test);
    });
    setTimeout(() => {
      this.event.publish('test', { id: 1 });
    }, 1000);
  }
}
