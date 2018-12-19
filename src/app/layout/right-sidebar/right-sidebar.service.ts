import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class RightSidebarService {
    atualiza = new Subject();
}
