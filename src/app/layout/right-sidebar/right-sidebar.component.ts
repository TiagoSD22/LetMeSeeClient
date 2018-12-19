import {Component, Injectable, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {RightSidebarService} from './right-sidebar.service';
import {ConfigService} from '../../shared/services/config/config.service';

@Component({
    selector: 'app-offsidebar',
    templateUrl: './right-sidebar.component.html',
    styleUrls: ['./right-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
@Injectable()
export class RightSidebarComponent implements OnInit {
    movimentacoes: Array<any> = [];

    constructor(private http: HttpClient, private config: ConfigService, private _service: RightSidebarService) {
    }

    ngOnInit() {
    }
}
