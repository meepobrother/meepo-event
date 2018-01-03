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
        window.addEventListener('online', (ev) => {
            this.event.publish('online', ev);
        }, false);
        window.addEventListener('offline', (ev) => {
            this.event.publish('offline', ev);
        }, false);
        window.addEventListener('orientationchange', (ev) => {
            this.event.publish('rotated', ev);
        });
    }

    addWinEvent(name): this {
        window.addEventListener(name, (ev) => {
            this.event.publish(name, ev);
        }, false);
        return this;
    }

}