import { Injectable } from '@angular/core';

@Injectable()
export class TimeOutService {
    timeouts: any[] = [];
    constructor() { }

    add(callback: Function, timeout: number): number {
        let timeoutId: number = setTimeout(callback, timeout);
        this.timeouts.push(timeoutId);
        return timeoutId;
    }

    clear(timeoutId: number) {
        let index = this.timeouts.indexOf(timeoutId);
        this.timeouts.splice(index, 1);
        clearTimeout(timeoutId);
    }

    clearAll() {
        this.timeouts.map(id => {
            this.clear(id);
        });
    }
}