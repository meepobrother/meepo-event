import { NgModule } from '@angular/core';
import { EventService } from './events';
import { WinEventService } from './win.event';
import { IntervalService } from './interval';
import { TimeOutService } from './timeout';

@NgModule({
    imports: [
    ],
    exports: [],
    declarations: [],
    providers: [
        EventService,
        WinEventService,
        IntervalService,
        TimeOutService
    ],
})
export class EventsModule { }
export { EventService } from './events';
export { WinEventService } from './win.event';
export { IntervalService } from './interval';
export { TimeOutService } from './timeout';
