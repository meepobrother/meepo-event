
import {
    Injector, EventEmitter,
    Injectable, InjectionToken, Inject,
    NgModule, ModuleWithProviders, SkipSelf, Optional
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
export const SOCKET_ROOMS = new InjectionToken<SocketRoom<any>[]>('SOCKET_ROOMS');

// 所有房间
export type SocketRooms = SocketRoom<any>[];

export class SocketEvent extends EventEmitter<any> {
    constructor() {
        super(true);
    }
}

export interface Room {
    name?: string;
}

export class SocketRoom<T> implements Room {
    event: SocketEvent;
    constructor(public name: string) {
        this.event = new SocketEvent();
    }

    emit(data: any) {
        this.event.emit(data);
    }

    subscribe(fn: Function, cm?: Function, err?: Function): any {
        return this.event.subscribe(fn, cm, err);
    }

    unsubscribe(): void {
        this.event.unsubscribe();
    }

    next(data: any): void {
        this.event.next(data);
    }

    complete(): void {
        this.event.complete();
    }

    error(err: any): void {
        this.event.error(err);
    }

    asObservable(): Observable<any> {
        return this.event.asObservable();
    }
}

export abstract class SocketService {
    rooms: SocketRooms;
    // 监听事件
    abstract on(name: string, fn: Function): void;
    // 发送事件
    abstract emit<T>(name: string, data: T): void;
    // 广播事件
    abstract broadcast<T>(data: T): void;
    // 根据名字查找room
    abstract getRoom(name: string): SocketRooms;
}

@Injectable()
export class SocketServiceDefault extends SocketService {
    time: any = new Date().getTime();
    constructor(
        @Inject(SOCKET_ROOMS) public rooms: any
    ) {
        super();
        this._unique();
        console.log('SocketServiceDefault', this.time);
    }
    on(name: string, fn: Function) {
        let rooms: SocketRooms = this.getRoom(name);
        rooms.map(room => {
            room.subscribe(fn);
        });
    }
    emit<T>(name: string, data: T): void {
        let rooms: SocketRooms = this.getRoom(name);
        rooms.map(room => {
            room.next(data);
        });
    }
    broadcast<T>(data: T): void {
        this.rooms.map(room => {
            room.next(data);
        });
    }
    getRoom(name: string): SocketRooms {
        let rooms: any[] = [];
        this.rooms.map(room => {
            if (room.name === name) {
                rooms = [...rooms, room];
            }
        });
        return rooms;
    }
    // 去掉重复房间号
    private _unique() {
        let res = [];
        let json = {};
        this.rooms.map((room) => {
            if (!json[room.name]) {
                if (room instanceof SocketRoom) {
                    res.push(room);
                    json[room.name] = 1;
                } else {
                    room = new SocketRoom(room.name);
                    res.push(room);
                    json[room.name] = 1;
                }
            }
        });
        this.rooms = res;
    }
}

@NgModule({
    declarations: [],
    exports: []
})
export class SocketModule {
    static forRoot(room?: Room): ModuleWithProviders {
        return {
            ngModule: SocketModule,
            providers: [
                {
                    provide: SocketServiceDefault,
                    useFactory: SocketServiceFactory,
                    deps: [SOCKET_ROOMS, [new Optional(), new SkipSelf(), SocketServiceDefault]]
                },
                {
                    provide: SocketService,
                    useExisting: SocketServiceDefault
                },
                provideRooms(room)
            ]
        }
    }
    static forChild(room?: Room): ModuleWithProviders {
        return {
            ngModule: SocketModule,
            providers: [
                {
                    provide: SocketServiceDefault,
                    useFactory: SocketServiceFactory,
                    deps: [SOCKET_ROOMS, [new Optional(), new SkipSelf(), SocketServiceDefault]]
                },
                {
                    provide: SocketService,
                    useExisting: SocketServiceDefault
                },
                provideRooms(room)
            ]
        }
    }
}

export function provideRooms(room: Room = { name: 'root' }): any {
    return {
        provide: SOCKET_ROOMS,
        multi: true,
        useValue: room
    }
}

export function SocketServiceFactory(rooms: SocketRooms, socketService: SocketService) {
    return socketService || new SocketServiceDefault(rooms);
}
