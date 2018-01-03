import { Injectable } from '@angular/core';

@Injectable()
export class IntervalService {
    ids: any[] = [];
    constructor() { }

    add(callback: Function, time: number) {
        let id = setInterval(callback, time);
        this.ids.push(id);
        return id;
    }

    clear(id: number) {
        clearInterval(id);
        let index = this.ids.indexOf(id);
        this.ids.splice(index, 1);
    }

    removeAll() {
        this.ids.map(id => {
            this.clear(id);
        });
    }
}