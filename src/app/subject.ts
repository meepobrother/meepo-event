import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
@Injectable()
export class SubjectService {
    ids: Subscription[] = [];
    constructor() { }

    add(sub: Subject<any> | Observable<any>, callback: Function): Subscription {
        let subscription: Subscription = sub.subscribe(res => {
            callback(res);
        });
        this.addId(subscription);
        return subscription;
    }

    addId(id: Subscription): this {
        this.ids.push(id);
        return this;
    }

    clear(id: Subscription): this {
        id.unsubscribe();
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