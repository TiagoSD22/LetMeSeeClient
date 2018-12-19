import {Component, Input} from "@angular/core";

@Component({
    selector: "image-over-card",
    templateUrl: "./image-over-card.component.html",
})
export class ImageOverCardComponent {
    @Input("title") title: string;
    @Input("align") align: string;
    @Input("imgPath") imgPath: string;
    @Input("subtitle") subtitle: string;

    constructor() {
        this.title = this.title || "";
        this.align = this.align || "";
        this.imgPath = this.imgPath || "";
        this.subtitle = this.subtitle || "";
    }
}
