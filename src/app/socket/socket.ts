
import {
    Injector, EventEmitter,
    Injectable, InjectionToken, Inject,
    NgModule, ModuleWithProviders
} from '@angular/core';

export const SOCKET_ROOMS = new InjectionToken<SocketRoom<any>[]>('SOCKET_ROOMS');

// 所有房间
export type SocketRooms = SocketRoom<any>[];

export class SocketEvent extends EventEmitter<any> {
    constructor() {
        super(true);
    }
}

export class SocketRoom<T> {
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

    asObservable() {
        return this.event.asObservable();
    }
}

@Injectable()
export class SocketService {
    constructor(
        @Inject(SOCKET_ROOMS) public rooms: any
    ) {
        this._unique();
        console.log(this);
    }
    // 监听事件
    on(name: string, fn: Function) {
        let rooms: SocketRooms = this.getRoom(name);
        rooms.map(room => {
            room.subscribe(fn);
        });
    }
    // 发送事件
    emit<T>(name: string, data: T): void {
        let rooms: SocketRooms = this.getRoom(name);
        rooms.map(room => {
            room.next(data);
        });
    }

    broadcast<T>(data: T) {
        this.rooms.map(room => {
            room.next(data);
        });
    }
    // 根据名字查找room，允许重名
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
                res.push(room);
                json[room.name] = 1;
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
    static forRoot(room?: SocketRoom<any>): ModuleWithProviders {
        return {
            ngModule: SocketModule,
            providers: [
                SocketService,
                provideRooms(room)
            ]
        }
    }
    static forChild(room?: SocketRoom<any>): ModuleWithProviders {
        return {
            ngModule: SocketModule,
            providers: [
                provideRooms(room)
            ]
        };
    }
}

export function provideRooms(room: SocketRoom<any> = new SocketRoom('root')): any {
    return {
        provide: SOCKET_ROOMS,
        multi: true,
        useValue: room
    }
}
