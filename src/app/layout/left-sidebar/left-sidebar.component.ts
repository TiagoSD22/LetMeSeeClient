import {Component, ElementRef, HostListener, OnInit} from "@angular/core";

import {GlobalState} from "../../app.state";
import {ConfigService} from "../../shared/services/config/config.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./left-sidebar.component.html",
    styleUrls: ["./left-sidebar.component.scss"]
})
export class LeftSidebarComponent implements OnInit {

    public scrollbarOptions = {
        axis: "y",
        theme: "minimal",
        scrollInertia: 0,
        mouseWheel: {preventDefault: true}
    };

    constructor(public config: ConfigService, private _elementRef: ElementRef, private _state: GlobalState) {
        this._state.subscribe("app.isCollapsed", isCollapsed => {
            this.config.appLayout.isApp_SidebarLeftCollapsed = isCollapsed;
        });
    }

    ngOnInit() {
    }

    toggleMenuSideabar() {
        if(window.innerWidth>992){
            this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
            this._state.notifyDataChanged("app.isCollapsed", this.config.appLayout.isApp_SidebarLeftCollapsed);
        }else{
            this.config.appLayout.isApp_MobileSidebarLeftOpen = !this.config.appLayout.isApp_MobileSidebarLeftOpen;
            this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
            this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
            this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        }
       return false;
    }

    @HostListener("window:resize")
    public onWindowResize(): void {
    }
}
