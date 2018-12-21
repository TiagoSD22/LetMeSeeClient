import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {GaugeModule} from 'angular-gauge';
import {MomentModule} from "angular2-moment";
import {TabsModule} from "ngx-bootstrap/tabs";
import {AlertModule} from "ngx-bootstrap/alert";
import {ModalModule} from "ngx-bootstrap/modal";
import {FormWizardModule} from "angular2-wizard";
import {CustomFormsModule} from "ng2-validation";
import {PopoverModule} from "ngx-bootstrap/popover";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";
import {AppBackdropComponent} from "./components/app_backdrop/app_backdrop.component";
import {SmdFabSpeedDialActionsComponent, SmdFabSpeedDialComponent, SmdFabSpeedDialTriggerComponent} from "./components/fab";
import {MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTabsModule, MatToolbarModule, MatTooltipModule} from "@angular/material";
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MomentModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatTabsModule,
        MatChipsModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatRippleModule,
        MatSelectModule,
        MatSliderModule,
        MatDialogModule,
        MatSidenavModule,
        MatStepperModule,
        MatToolbarModule,
        MatTooltipModule,
        FormWizardModule,
        MatGridListModule,
        MatCheckboxModule,
        MatSnackBarModule,
        CustomFormsModule,
        MatExpansionModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        TabsModule.forRoot(),
        MatAutocompleteModule,
        MatButtonToggleModule,
        GaugeModule.forRoot(),
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        MatProgressSpinnerModule,
        BsDropdownModule.forRoot(),
        MalihuScrollbarModule.forRoot()
    ],
    declarations: [
        AppBackdropComponent,
        SmdFabSpeedDialComponent,
        SmdFabSpeedDialActionsComponent,
        SmdFabSpeedDialTriggerComponent,
        SlidePanelComponent
    ],
    exports: [
        TabsModule,
        FormsModule,
        AlertModule,
        ModalModule,
        CommonModule,
        MomentModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatMenuModule,
        MatTabsModule,
        PopoverModule,
        MatChipsModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatDialogModule,
        MatRippleModule,
        MatSelectModule,
        MatSliderModule,
        MatSidenavModule,
        MatStepperModule,
        MatToolbarModule,
        BsDropdownModule,
        MatTooltipModule,
        FormWizardModule,
        MatGridListModule,
        MatCheckboxModule,
        MatSnackBarModule,
        CustomFormsModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AppBackdropComponent,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MalihuScrollbarModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        SmdFabSpeedDialComponent,
        SmdFabSpeedDialTriggerComponent,
        SmdFabSpeedDialActionsComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
