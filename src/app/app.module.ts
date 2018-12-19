import {NgModule} from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule, Title} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppState} from "./app.service";
import {GlobalState} from "./app.state";
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routing";
import {ResponsiveModule} from "ng2-responsive";
import {SharedModule} from "./shared/shared.module";
import {ServicesModule} from "./shared/services/services.module";
import {RightSidebarService} from './layout/right-sidebar/right-sidebar.service';

const APP_PROVIDERS = [AppState, GlobalState, Title, RightSidebarService];

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule,
        ServicesModule,
        ResponsiveModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        SharedModule.forRoot(),
        ToastrModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [APP_PROVIDERS],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appState: AppState) {
    }
}
