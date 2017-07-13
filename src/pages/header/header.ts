import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Nav, Searchbar } from 'ionic-angular';

@Component({
    selector: 'wp-header',
    templateUrl: 'header.html'
})
export class HeaderComponent {
    @ViewChild(Nav) nav: Nav;
    @ViewChild(Searchbar) searchbar: Searchbar;

    @Output() startSearch = new EventEmitter();
    @Output() cancelSearchKeyword = new EventEmitter();
    @Output() setSearchKeyword = new EventEmitter();

    searchKeyword:string;

    constructor(
    ) {}

    searchStart():void {
        console.log('focus search');
        this.startSearch.emit();

        setTimeout(() => {
            this.searchbar.setFocus();
        },10);
    };

    searching(ev):void {
        this.setSearchKeyword.emit(this.searchKeyword);
    }

    cancelKeyword($event){
        this.cancelSearchKeyword.emit();
    }
}
