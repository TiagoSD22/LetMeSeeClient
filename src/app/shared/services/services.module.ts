import {NgModule, Optional, SkipSelf} from "@angular/core";

import {ConfigService} from "./config/config.service";
import {ThemesService} from './themes/themes.service';
import {SpinnerService} from "./spinner/spinner.service";
import {PreloaderService} from "./preloader/preloader.service";

@NgModule({
    exports: [],
    imports: [],
    declarations: [],
    providers: [ConfigService, ThemesService, PreloaderService, SpinnerService]
})
export class ServicesModule {
    constructor(@Optional() @SkipSelf() parentModule: ServicesModule) {
    }
}
