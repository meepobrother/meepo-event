import { NgModule, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SocketModule, SocketRoom, SocketService, SocketServiceDefault } from '../../../src/app/app';

@Component({
    selector: 'index-page',
    template: `
        index
    `,
    providers: [
        {
            provide: SocketService,
            useExisting: SocketServiceDefault
        },
    ]
})
export class IndexComponent implements OnInit {
    constructor(
        public socket: SocketService
    ) {
        this.socket.on('index', (data) => {
            console.log('index', data);
        });
    }
    ngOnInit() {

    }
}

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: 'index',
            component: IndexComponent
        }]),
        SocketModule.forRoot(),
        SocketModule.forRoot(),
        SocketModule.forRoot(),
        SocketModule.forRoot(),
        SocketModule.forRoot(),
        SocketModule.forRoot(),
        SocketModule.forRoot(),
        SocketModule.forRoot()
    ],
    exports: [],
    declarations: [IndexComponent],
    providers: [],
})
export class IndexModule { }
