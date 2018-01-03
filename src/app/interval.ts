import { Injectable } from '@angular/core';

@Injectable()
export class IntervalService {
    ids: any[] = [];
    constructor() { }

    add(callback: Function, time: number): number {
        let id = setInterval(callback, time);
        this.addId(id);
        return id;
    }

    addId(id: number): this {
        this.ids.push(id);
        return this;
    }

    clear(id: number): this {
        clearInterval(id);
        let index = this.ids.indexOf(id);
        this.ids.splice(index, 1);
        return this;
    }

    clearAll(): this {
        this.ids.map(id => {
            this.clear(id);
        });
        return this;
    }
}