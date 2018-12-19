import {Injectable} from "@angular/core";

export type InternalStateType = {
    [key: string]: any;
};

@Injectable()
export class AppState {
    constructor() {
    }

    _state: InternalStateType = {};

    get state() {
        return (this._state = AppState._clone(this._state));
    }

    set state(value) {
        throw new Error("do not mutate the `.state` directly");
    }

    private static _clone(object: InternalStateType) {
        return JSON.parse(JSON.stringify(object));
    }

    get(prop?: any) {
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    set(prop: string, value: any) {
        return (this._state[prop] = value);
    }
}
