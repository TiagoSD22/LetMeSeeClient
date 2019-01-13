import { ImageCropperModule } from 'ngx-image-cropper';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/services/config/config.service';
import { ViewChild,ElementRef} from '@angular/core';
import { HostListener} from "@angular/core";
import 'rxjs/add/observable/interval';
import { MatSidenav } from '@angular/material';
import {Imagem} from "../imagem";
import { MatSnackBar } from '@angular/material';
import { ImageCroppedEvent } from "../../../../node_modules/ngx-image-cropper/src/interfaces/image-cropped-event.interface";
import {CanvasWhiteboardComponent} from "ng2-canvas-whiteboard";
import {slideInOut} from "./animation";
import {FiltrosService} from "./filtros-service.service";

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  animations: [ slideInOut ],
  viewProviders: [CanvasWhiteboardComponent],
  encapsulation: ViewEncapsulation.None
})
export class FiltrosComponent implements OnInit {

  imagem : Imagem;
  escala : number = 1;
  pilha : Imagem[] = [];
  pilhaIndice : number = 0;
  menu : boolean = true;
  carregando : boolean = false;
  larguraOriginal : number;
  alturaOriginal: number;

  draw : boolean = false;

  sidenavs : Map<String, boolean> = new Map<String, boolean>(); 

  @ViewChild('imgContainer') imgContainer : ElementRef;
  lar : number;
  alt : number;

  @ViewChild('imageCropper') imageCropper : any;
  showCropper : boolean = false;
  
  constructor(
    private config: ConfigService, 
    private _router: Router, 
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private filtrosService : FiltrosService) { }

  ngOnInit() {
    this.imagem = this.config.getImgAtual();
    if(this.imagem != undefined){
      this.pilha[0] = this.imagem;
      this.larguraOriginal = this.imagem.largura;
      this.alturaOriginal = this.imagem.altura;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.config.appLayout.isApp_SidebarLeftCollapsed) {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
      }
    });
    this.ajustarTela();
  }

  ajustarTela(){
    if(this.imagem != undefined){
      let altura = document.getElementById('img-container').clientHeight;
      let largura = document.getElementById('img-container').clientWidth;
      document.getElementById('image').style.transform = "translate3d(0px, 0px, 0px)";
      let area = 0.92;
      if (this.larguraOriginal < largura && this.alturaOriginal < altura) {
        this.escala = 1;
      }
      else {
        if (this.larguraOriginal * this.escala > largura && this.alturaOriginal * this.escala > altura) {
          let fator;
          fator = (this.imagem.largura * this.imagem.altura * area * area) / (altura * largura);
          fator = Math.sqrt(fator);
          fator = Math.sqrt(fator);
          this.escala = (fator * altura * fator * largura) / (this.alturaOriginal * this.larguraOriginal);
        }
        else {
          if (this.larguraOriginal * this.escala > largura) {
            this.escala = (area * largura * this.alturaOriginal) / (this.alturaOriginal * this.larguraOriginal);
          }
          else {
            this.escala = (area * altura * this.larguraOriginal) / (this.alturaOriginal * this.larguraOriginal);
          }
        }
      }
    }
  }

  mostrarTamanhoOriginal(){
    this.escala = 1;
  }

  aumentarEscala(){
    if(this.escala < 4)
      this.escala += 0.05;
  }

  diminuirEscala(){
    if(this.escala > 0.10)
      this.escala -= 0.05;
  }

  adicionarPilha(){
    this.pilha.push(this.imagem);
    this.pilhaIndice += 1;
  }

  desfazer(){
    if(this.pilhaIndice > 0){
      this.pilhaIndice -= 1;
      this.imagem = this.pilha[this.pilhaIndice];
      this.config.seImgAtual(this.imagem);
    }
  }

  desfazerTudo(){
    this.pilhaIndice = 0;
    this.imagem = this.pilha[this.pilhaIndice]
    this.config.seImgAtual(this.imagem);
  }

  refazer(){
    if(this.pilhaIndice < this.pilha.length - 1){
      this.pilhaIndice += 1;
      this.imagem = this.pilha[this.pilhaIndice];
      this.config.seImgAtual(this.imagem);
    }
  }

  salvarImagem(){
    const a = document.createElement('a');    
    var image_data = atob(this.imagem.conteudoBase64.toString());
    var arraybuffer = new ArrayBuffer(image_data.length);
    var view = new Uint8Array(arraybuffer);
    for (var i=0; i<image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
    }
    a.href = window.URL.createObjectURL(new Blob([arraybuffer], {type: 'application/octet-stream'}));
    a.download = this.imagem.nome.toString().concat('.').concat(this.imagem.tipo.toString());
    document.body.appendChild(a);
    a.click()
  }

  filtroAplicado(event){
    this.carregando = false;
    this.toggleSidenav(event["filtro"]);
    this.imagem = event["imagemProcessada"];
    this.openSnackBar("Sucesso!",event["msg"]);
    this.config.seImgAtual(this.imagem);
    this.adicionarPilha();
    this.atualizarDimensoesOriginais();
  }

  toggleSidenav(sidenav : String){
    if(this.sidenavs.get(sidenav.toString()) == undefined){
      this.sidenavs.set(sidenav.toString(), false);
    }
    this.sidenavs.set(sidenav.toString(), !this.sidenavs.get(sidenav.toString()));
    this.menu = !this.menu;
  }

  atualizarDimensoesImagem(event){
    this.imagem.largura = event["novaLargura"];
    this.imagem.altura = event["novaAltura"];
  }

  atualizarDimensoesOriginais(){
    this.larguraOriginal = this.imagem.largura;
    this.alturaOriginal = this.imagem.altura;
    this.changeDetectorRefs.detectChanges();
  }

  restaurarDimensoes(event){
    this.imagem.largura = event["largura"];
    this.imagem.altura = event["altura"];
    this.changeDetectorRefs.detectChanges();
  }

  updateCropper(event){
    this.imageCropper.maintainAspectRatio = event["manterAspecto"];
    this.imageCropper.roundCropper = event["formatoCorte"] == "circular"? true : false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(action, message, {
      duration: 1500,
      verticalPosition : 'top',
      horizontalPosition: 'center'
    });
  }
  
  imageLoaded(){
    //this.ajustarTela();
    //this.ajustarCropper(this.escala,this.escala);
  }

  ajustarCropper(fatorCropper : number, fatorCropperImage : number){
    let alturaAtualCropperImage = document.getElementById("CropperDiv").children["0"].children["0"].attributes[3].ownerElement.height;
          let larguraAtualCropperImage = document.getElementById("CropperDiv").children["0"].children["0"].attributes[3].ownerElement.width;

          let alturaAtualCropper = document.getElementById("CropperDiv").children["0"].children["1"].style.height;
          let larguraAtualCropper = document.getElementById("CropperDiv").children["0"].children["1"].style.width;

          document.getElementById("CropperDiv").children["0"].children["0"].attributes[3].ownerElement.height = this.imagem.altura * fatorCropperImage;
          document.getElementById("CropperDiv").children["0"].children["0"].attributes[3].ownerElement.width = this.imagem.largura * fatorCropperImage;
          
          document.getElementById("CropperDiv").children["0"].children["1"].style.height = this.imagem.altura * fatorCropper;
          document.getElementById("CropperDiv").children["0"].children["1"].style.width = this.imagem.largura * fatorCropper;
  }

  escalaMudou(event : any){
    this.escala = event.value;
    if(this.showCropper){
      //this.ajustarCropper((1 - ( this.escalaInicialCropper - this.escala)),(1 - ( this.escalaInicialCropperImg - this.escala)));
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if((event.ctrlKey || event.metaKey) && event.keyCode == 90){
      if(event.shiftKey){
        this.desfazerTudo();
      }
      else{
        this.desfazer();
      }
    }
    else if((event.ctrlKey || event.metaKey) && event.keyCode == 89){
      this.refazer();
    }
    else if(event.key === '+' || event.keyCode == 107){
      this.aumentarEscala();
    }
    else if(event.key === '-' || event.keyCode == 109 || event.keyCode == 189){
      this.diminuirEscala();
    }
    else if(event.keyCode == 32){
      this.ajustarTela();
    }
    else if(((event.ctrlKey || event.metaKey) && event.keyCode == 48) || ((event.ctrlKey || event.metaKey) && event.keyCode == 96)){
      this.mostrarTamanhoOriginal();
    }
    else if((event.ctrlKey || event.metaKey) && event.keyCode == 83){
      if(event.shiftKey){
        this.salvarImagem();
      }
    }
  }

  ngOnDestroy(): void {
    if(this.carregando){
      this.carregando = false;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event.base64);
    //console.log(event);
  }

  mock(){
    this.draw = true;
    this.carregando = true;
    let nomeFiltro = "mock"
    let parametrosURL = JSON.stringify({
      "campo" : 'valor'
    });
    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosURL,this.imagem).subscribe(response => {
      this.carregando = false;
      this.openSnackBar("Sucesso!","");
      this.imagem = response;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }
}
