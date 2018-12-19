import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {LayoutRoutes} from "./layout.routes";
import {LayoutComponent} from "./layout.component";
import {SharedModule} from "../shared/shared.module";
import {FooterComponent} from "./footer/footer.component";
import {TopNavbarComponent} from "./top-navbar/top-navbar.component";
import {SearchComponent} from "./top-navbar/search/search.component";
import {LeftSidebarComponent} from "./left-sidebar/left-sidebar.component";
import {ScrollbarDirective} from "../shared/directives/scrollbar.directive";
import {RightSidebarComponent} from "./right-sidebar/right-sidebar.component";
import {NavDropDownDirectives} from "../shared/directives/nav-dropdown.directive";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        LayoutComponent,
        SearchComponent,
        FooterComponent,
        TopNavbarComponent,
        ScrollbarDirective,
        LeftSidebarComponent,
        RightSidebarComponent,
        NavDropDownDirectives
    ],
    imports: [
        FormsModule,
        LayoutRoutes,
        CommonModule,
        SharedModule.forRoot(),
        PerfectScrollbarModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class LayoutModule {
}
