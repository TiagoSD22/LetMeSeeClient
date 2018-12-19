import {AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, QueryList, Renderer, ViewEncapsulation} from "@angular/core";
import {MatButton} from "@angular/material";

const Z_INDEX_ITEM: number = 23;

@Component({
    selector: "smd-fab-trigger",
    template: `
        <ng-content select="[md-fab], [mat-fab]"></ng-content>
    `
})
export class SmdFabSpeedDialTriggerComponent {
    @Input() spin: boolean = false;

    constructor(@Inject(forwardRef(() => SmdFabSpeedDialComponent)) private _parent: SmdFabSpeedDialComponent) {
    }

    @HostBinding("class.smd-spin")
    get sp() {
        return this.spin;
    }

    @HostListener("click", ["$event"])
    _onClick(event: any) {
        if (!this._parent.fixed) {
            this._parent.toggle();
            event.stopPropagation();
        }
    }
}

@Component({
    selector: "smd-fab-actions",
    template: `
        <ng-content select="[mat-mini-fab], [mat-mini-fab]"></ng-content>
    `
})
export class SmdFabSpeedDialActionsComponent implements AfterContentInit {
    @ContentChildren(MatButton) _buttons: QueryList<MatButton>;

    constructor(@Inject(forwardRef(() => SmdFabSpeedDialComponent))
                private _parent: SmdFabSpeedDialComponent,
                private renderer: Renderer) {
    }

    ngAfterContentInit(): void {
        this._buttons.changes.subscribe(() => {
            this.initButtonStates();
            this._parent.setActionsVisibility();
        });

        this.initButtonStates();
    }

    show() {
        if (this._buttons) {
            this._buttons.toArray().forEach((button, i) => {
                let transitionDelay = 0;
                let transform;
                if (this._parent.animationMode === "scale") {
                    // Incremental transition delay of 65ms for each action button
                    transitionDelay = 3 + 65 * i;
                    transform = "scale(1)";
                } else {
                    transform = this.getTranslateFunction("0");
                }
                this.changeElementStyle(
                    button._getHostElement(),
                    "transition-delay",
                    transitionDelay + "ms"
                );
                this.changeElementStyle(button._getHostElement(), "opacity", "1");
                this.changeElementStyle(
                    button._getHostElement(),
                    "transform",
                    transform
                );
            });
        }
    }

    hide() {
        if (this._buttons) {
            this._buttons.toArray().forEach((button, i) => {
                let opacity = "1";
                let transitionDelay = 0;
                let transform;
                if (this._parent.animationMode === "scale") {
                    transitionDelay = 3 - 65 * i;
                    transform = "scale(0)";
                    opacity = "0";
                } else {
                    transform = this.getTranslateFunction(55 * (i + 1) - i * 5 + "px");
                }
                this.changeElementStyle(
                    button._getHostElement(),
                    "transition-delay",
                    transitionDelay + "ms"
                );
                this.changeElementStyle(button._getHostElement(), "opacity", opacity);
                this.changeElementStyle(
                    button._getHostElement(),
                    "transform",
                    transform
                );
            });
        }
    }

    private initButtonStates() {
        this._buttons.toArray().forEach((button, i) => {
            this.renderer.setElementClass(
                button._getHostElement(),
                "smd-fab-action-item",
                true
            );
            this.changeElementStyle(
                button._getHostElement(),
                "z-index",
                "" + (Z_INDEX_ITEM - i)
            );
        });
    }

    private getTranslateFunction(value: string) {
        let dir = this._parent.direction;
        let translateFn =
            dir === "up" || dir === "down" ? "translateY" : "translateX";
        let sign = dir === "down" || dir === "right" ? "-" : "";
        return translateFn + "(" + sign + value + ")";
    }

    private changeElementStyle(elem: any, style: string, value: string) {
        this.renderer.setElementStyle(elem, style, value);
    }
}

@Component({
    selector: "smd-fab-speed-dial",
    template: `
        <div class="smd-fab-speed-dial-container">
            <ng-content select="smd-fab-trigger"></ng-content>
            <ng-content select="smd-fab-actions"></ng-content>
        </div>
    `,
    styleUrls: ["fab.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class SmdFabSpeedDialComponent implements AfterContentInit {
    /**
     * Whether this speed dial is fixed on screen (user cannot change it by clicking)
     */
    @Input() fixed: boolean = false;
    @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ContentChild(SmdFabSpeedDialActionsComponent)
    _childActions: SmdFabSpeedDialActionsComponent;
    private isInitialized: boolean = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    private _direction: string = "up";

    @Input()
    get direction() {
        return this._direction;
    }

    set direction(direction: string) {
        let previousDir = this._direction;
        this._direction = direction;
        if (previousDir !== this.direction) {
            this._setElementClass(previousDir, false);
            this._setElementClass(this.direction, true);

            if (this.isInitialized) {
                this.setActionsVisibility();
            }
        }
    }

    private _open: boolean = false;

    @HostBinding("class.smd-opened")
    @Input()
    get open() {
        return this._open;
    }

    set open(open: boolean) {
        let previousOpen = this._open;
        this._open = open;
        if (previousOpen !== this._open) {
            this.openChange.emit(this._open);
            if (this.isInitialized) {
                this.setActionsVisibility();
            }
        }
    }

    private _animationMode: string = "fling";

    @Input()
    get animationMode() {
        return this._animationMode;
    }

    set animationMode(animationMode: string) {
        let previousAnimationMode = this._animationMode;
        this._animationMode = animationMode;
        if (previousAnimationMode !== this._animationMode) {
            this._setElementClass(previousAnimationMode, false);
            this._setElementClass(this.animationMode, true);

            if (this.isInitialized) {
                // To start another detect lifecycle and force the "close" on the action buttons
                Promise.resolve(null).then(() => (this.open = false));
            }
        }
    }

    ngAfterContentInit(): void {
        this.isInitialized = true;
        this.setActionsVisibility();
        this._setElementClass(this.direction, true);
        this._setElementClass(this.animationMode, true);
    }

    public toggle() {
        this.open = !this.open;
    }

    @HostListener("click")
    _onClick() {
        if (!this.fixed && this.open) {
            this.open = false;
        }
    }

    setActionsVisibility() {
        if (this.open) {
            this._childActions.show();
        } else {
            this._childActions.hide();
        }
    }

    private _setElementClass(elemClass: string, isAdd: boolean) {
        this.renderer.setElementClass(
            this.elementRef.nativeElement,
            `smd-${elemClass}`,
            isAdd
        );
    }
}
