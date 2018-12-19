import { Imagem } from './../../../pages/imagem';
import {Injectable} from "@angular/core";

declare var $: any;

@Injectable()
export class ConfigService {

    public app: any;
    public appLayout: any;
    public breakpoint: any;
    private ip : String;
    public imgAtual : Imagem = undefined;

    constructor() {
        this.ip = window.location.origin;
        this.app = {
            name: "Template",
            urlBase: window.location.origin.substring(0,this.ip.length - 5).concat(":9090/server").toString()
        };
        this.appLayout = {
            isApp_Boxed: false,
            isApp_BackdropVisible: false,
            isApp_SidebarRightOpen: false,
            isApp_SidebarLeftCollapsed: false,
            isApp_MobileSidebarLeftOpen: false
        };
        this.breakpoint = {
            mobile: 576,
            tablet: 768,
            desktop: 992,
            desktopLG: 1280
        };
    }

    seImgAtual(img : Imagem){
        this.imgAtual = img;
    }

    getImgAtual(){
        return this.imgAtual;
    }
}