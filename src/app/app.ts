import { NgModule } from '@angular/core';
import { EventService } from './events';
import { WinEventService } from './win.event';
@NgModule({
    imports: [
    ],
    exports: [],
    declarations: [],
    providers: [
        EventService,
        WinEventService
    ],
})
export class EventsModule { }
export { EventService } from './events';
export { WinEventService } from './win.event';

