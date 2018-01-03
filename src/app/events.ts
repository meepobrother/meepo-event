import { Injectable } from '@angular/core';
import { StoreService } from 'meepo-store';
import { VERSION, VERSION_CHANGE } from './dbs';
@Injectable()
export class EventService {
    private _channels: any = [];
    constructor(
        public store: StoreService
    ) { }

    checkVersion(version: number) {
        let cacheVersion = this.store.get(VERSION, 0);
        if (cacheVersion === version) {
        } else {
            this.store.set(VERSION, version);
            this.store.clearAll();
            this.publish(VERSION_CHANGE, version);
        }
    }

    subscribe(topic: string, ...handlers: Function[]) {
        if (!this._channels[topic]) {
            this._channels[topic] = [];
        }
        handlers.forEach((handler) => {
            this._channels[topic].push(handler);
        });
    }

    unsubscribe(topic: string, handler: Function = null) {
        let t = this._channels[topic];
        if (!t) {
            return false;
        }
        if (!handler) {
            delete this._channels[topic];
            return true;
        }
        let i = t.indexOf(handler);
        if (i < 0) {
            return false;
        }
        t.splice(i, 1);
        if (!t.length) {
            delete this._channels[topic];
        }
        return true;
    }

    clearAll() {
        this._channels = [];
    }

    publish(topic: string, ...args: any[]) {
        var t = this._channels[topic];
        if (!t) {
            return null;
        }
        let responses: any[] = [];
        t.forEach((handler: any) => {
            responses.push(handler(...args));
        });
        return responses;
    }
}