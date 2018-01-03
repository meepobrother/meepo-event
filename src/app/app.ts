import { NgModule } from '@angular/core';
import { EventService } from './events';
import { WinEventService } from './win.event';
import { IntervalService } from './interval';
import { TimeOutService } from './timeout';
import { SubjectService } from './subject';

@NgModule({
    imports: [
    ],
    exports: [],
    declarations: [],
    providers: [
        EventService,
        WinEventService,
        IntervalService,
        TimeOutService,
        SubjectService
    ],
})
export class EventsModule { }
export { EventService } from './events';
export { WinEventService } from './win.event';
// 事件添加及清理
export { IntervalService } from './interval';
export { TimeOutService } from './timeout';
export { SubjectService } from './subject';
