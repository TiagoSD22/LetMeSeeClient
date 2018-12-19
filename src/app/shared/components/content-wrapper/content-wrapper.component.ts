import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'content-wrapper',
    templateUrl: './content-wrapper.component.html',
    styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent implements OnInit {

    @Input() title: string;

    constructor() {
    }

    ngOnInit() {
    }

}
