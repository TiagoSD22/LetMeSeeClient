import {Title} from "@angular/platform-browser";
import {NavigationEnd, Router} from '@angular/router';
import {Component, HostBinding, HostListener, OnInit, ViewContainerRef} from "@angular/core";

import {GlobalState} from "./app.state";
import {ConfigService} from "./shared/services/config/config.service";
import {ThemesService} from "./shared/services/themes/themes.service";
import {SpinnerService} from "./shared/services/spinner/spinner.service";
import {PreloaderService} from "./shared/services/preloader/preloader.service";

declare var $: any;

@Component({
    selector: "app-root",
    template: "<router-outlet></router-outlet>",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor(private router: Router,
                private _state: GlobalState,
                private titleService: Title,
                public config: ConfigService,
                private _spinner: SpinnerService,
                private themesService: ThemesService,
                private viewContainerRef: ViewContainerRef) {
    }

    @HostBinding("class.app_sidebar-menu-collapsed")
    get isApp_SidebarLeftCollapsed() {
        return this.config.appLayout.isApp_SidebarLeftCollapsed;
    }

    @HostBinding("class.app_sidebar-left-open")
    get isApp_MobileSidebarLeftOpen() {
        return this.config.appLayout.isApp_MobileSidebarLeftOpen;
    }

    @HostBinding("class.sidebar-overlay-open")
    get isApp_SidebarRightOpen() {
        return this.config.appLayout.isApp_SidebarRightOpen;
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    ngOnInit() {
        $(document).on("click", '[href="#"]', e => e.preventDefault());
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            $("body,html").scrollTop(0, 0);
        });
    }

    @HostListener("window:resize")
    public onWindowResize(): void {
        if (this._shouldMenuReset()) {
            this.config.appLayout.isApp_SidebarLeftCollapsed = false;
        }
    }

    public ngAfterViewInit(): void {
        PreloaderService.load().then(values => {
            this._spinner.hide();
        });
    }

    private _shouldMenuReset(): boolean {
        return window.innerWidth <= this.config.breakpoint.desktopLG;
    }
}
