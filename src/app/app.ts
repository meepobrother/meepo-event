import { NgModule } from '@angular/core';
import { EventService } from './events';
@NgModule({
    imports: [
    ],
    exports: [],
    declarations: [],
    providers: [
        EventService
    ],
})
export class EventsModule { }
export { EventService } from './events';


