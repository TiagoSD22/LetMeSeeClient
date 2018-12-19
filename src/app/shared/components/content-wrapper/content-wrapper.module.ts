import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared.module';
import {ContentWrapperComponent} from './content-wrapper.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        ContentWrapperComponent
    ],
    declarations: [ContentWrapperComponent]
})
export class ContentWrapperModule {}
