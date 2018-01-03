import { Injectable } from '@angular/core';

@Injectable()
export class TimeOutService {
    timeouts: any[] = [];
    constructor() { }

    add(callback: Function, timeout: number): number {
        let timeoutId: number = setTimeout(callback, timeout);
        this.addId(timeoutId);
        return timeoutId;
    }

    addId(id: number): this {
        this.timeouts.push(id);
        return this;
    }

    clear(timeoutId: number): this {
        let index = this.timeouts.indexOf(timeoutId);
        this.timeouts.splice(index, 1);
        clearTimeout(timeoutId);
        return this;
    }

    clearAll(): this {
        this.timeouts.map(id => {
            this.clear(id);
        });
        return this;
    }
}