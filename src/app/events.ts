import { Injectable } from '@angular/core';
import { StoreService } from 'meepo-store';
import { VERSION, VERSION_CHANGE } from './dbs';
import { UuidService } from 'meepo-uuid';
import { UtilService } from 'meepo-core';

@Injectable()
export class EventService {
    private _channels: Map<string, Map<string, any>> = new Map();
    constructor(
        public store: StoreService,
        public uuid: UuidService,
        public util: UtilService
    ) { }

    checkVersion(version: number) {
        let cacheVersion = this.store.get(VERSION, 0);
        if (cacheVersion === version) {
            console.log('版本号没有变化');
        } else {
            this.store.clearAll();
            this.store.set(VERSION, version);
            this.publish(VERSION_CHANGE, version);
        }
    }

    subscribe(topic: any, ...handlers: Function[]) {
        let ids = [];
        handlers.map(han => {
            let id = this.uuid.v1();
            let map: Map<string, any> = new Map();
            map.set(topic, han);
            this._channels.set(id, map);
            ids.push(id);
        });
        return ids;
    }

    subscribeWaite(from: any, to: any) {
        let id = this.subscribe(from, (res) => {
            this.unsubscribe(id);
            this.publish(to, {
                from: res
            });
        });
    }

    unsubscribe(ids: any) {
        if (this.util.isArray(ids)) {
            ids.map(id => {
                this._channels.delete(id);
            });
        } else {
            this._channels.delete(ids);
        }
        return true;
    }

    clearAll() {
        this._channels = new Map();
    }

    publish(topic: any, ...args: any[]) {
        let responses: any[] = [];
        this._channels.forEach((cha: Map<string, any>) => {
            let _to = cha.get(topic);
            if (_to) {
                responses.push(_to(...args));
            }
        });
        return responses;
    }
}