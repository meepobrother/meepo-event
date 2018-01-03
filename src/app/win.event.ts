import { Injectable } from '@angular/core';
import { EventService } from './events';
@Injectable()
export class WinEventService {
    constructor(
        public event: EventService
    ) {
        setTimeout(() => {
            this.setUpEvents();
        }, 0);
    }

    setUpEvents() {
        this.addWinEvent('online')
            .addWinEvent('offline')
            .addWinEvent('orientationchange', 'rotated');
    }

    addWinEvent(name: string, rename?: string): this {
        window.addEventListener(name, (ev) => {
            this.event.publish(rename ? rename : name, ev);
        }, false);
        return this;
    }

    addEleEvent(ele: HTMLElement, name: string, rename?: string) {
        ele.addEventListener(name, (ev) => {
            this.event.publish(rename ? rename : name, ev);
        }, false);
    }
    // 获取
    getWinName(name: string, def: any, rename?: string) {
        name = `__meepo_${name}`;
        window[name] = window[name] || def;
        if (rename) {
            this.event.publish(rename, window[name]);
        }
        return window[name];
    }
}