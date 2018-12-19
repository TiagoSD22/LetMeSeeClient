import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OnlyNumbersDirective} from "./only-numbers.directive";

@NgModule({
    declarations: [OnlyNumbersDirective],
    imports: [
        CommonModule,
    ],
    exports: [OnlyNumbersDirective]
})
export class NumberOnlyModule {}
