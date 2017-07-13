import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Nav } from 'ionic-angular';

export interface InterfacePage {
    title: string,
    component: any,
    params:any
}

@Component({
    selector: 'wp-header',
    templateUrl: 'header.html'
})
export class HeaderComponent {
    @ViewChild(Nav) nav: Nav;
    @Output() setSearchKeyword = new EventEmitter();

    pages: Array<InterfacePage>;
    categories: Array<InterfacePage>;

    constructor(
    ) {}

    search(ev):void {
        this.setSearchKeyword.emit(ev.data);
    }
}
