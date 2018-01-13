import { NgModule, ModuleWithProviders } from '@angular/core';
import { EventService } from './events';
import { WinEventService } from './win.event';
import { IntervalService } from './interval';
import { TimeOutService } from './timeout';
import { SubjectService } from './subject';
import { StoreModule } from 'meepo-store';
import { UuidModule } from 'meepo-uuid';
import { MeepoCoreServiceModule } from 'meepo-core';


@NgModule({
    imports: [
        StoreModule,
        UuidModule,
        MeepoCoreServiceModule
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class EventModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: EventModule,
            providers: [
                EventService,
                WinEventService,
                IntervalService,
                TimeOutService,
                SubjectService
            ]
        }
    }
}
export { EventService } from './events';
export { WinEventService } from './win.event';
// 事件添加及清理
export { IntervalService } from './interval';
export { TimeOutService } from './timeout';
export { SubjectService } from './subject';
export { VERSION, VERSION_CHANGE } from './dbs';
// socket event
export { SocketEvent, SocketModule, SocketRoom, SOCKET_ROOMS, SocketRooms, SocketService } from './socket/socket';
