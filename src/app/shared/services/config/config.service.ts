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
    public mostrarBarraLateral : boolean = true;

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

    esconderBarra(){
        document.getElementById('app_sidebar-left').style.visibility = "hidden";
        //document.getElementById('app-wrapper').style.backgroundColor = "#0e0e0e";
        document.getElementById('content_outer_wrapper').style.paddingLeft = "0px";
    }

    mostrarBarra(){
        document.getElementById('app_sidebar-left').style.visibility = "visible";
        document.getElementById('content_outer_wrapper').style.paddingLeft = "50px";
        //document.getElementById('content_outer_wrapper').className = "_content.scss";
    }
}