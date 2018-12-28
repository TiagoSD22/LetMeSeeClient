import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/services/config/config.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewChild,ElementRef} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from "@angular/common";
import { HostListener,HostBinding } from "@angular/core";
import 'rxjs/add/observable/interval';
import { MatTableDataSource, MatDrawer, MatSidenav } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {Imagem} from "../imagem";
import { MatSnackBar } from '@angular/material';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';
import { ImgSrcDirective } from '@angular/flex-layout';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class FiltrosComponent implements OnInit {

  urlFiltros : String = this.config.app.urlBase.concat("/aplicarFiltro");
  imagem : Imagem;
  escala : number = 1;
  pilha : Imagem[] = [];
  pilhaIndice : number = 0;
  menu : boolean = true;

  @ViewChild('imgContainer') imgContainer : ElementRef;
  lar : number;
  alt : number;

  @ViewChild('negativoSidenav') public negativoSidenav : MatSidenav;
  negativoSidenavAberta : boolean = false;

  @ViewChild('limiarSidenav') public limiarSidenav : MatSidenav;
  limiarSidenavAberta : boolean = false;
  valorLimiar : number = 128;

  @ViewChild('ajusteRGBSidenav') public ajusteRGBSidenav : MatSidenav;
  ajusteRGBSidenavAberta : boolean = false;
  valorR : number = 0;
  valorG : number = 0;
  valorB : number = 0;

  @ViewChild('robertsSidenav') public robertsSidenav : MatSidenav;
  robertsSidenavAberta : boolean = false;

  @HostBinding("attr.style")
  public get valueAsStyle(): any {
    return this.DomSanitizer.bypassSecurityTrustStyle(`--cor-vermelha: ${this.valorR}`);
  }

  constructor(private http: HttpClient, private toastr: ToastrService,private config: ConfigService, 
    private _fb: FormBuilder,private _router: Router, 
    private changeDetectorRefs: ChangeDetectorRef, private DomSanitizer: DomSanitizer,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.imagem = this.config.getImgAtual();
    this.pilha[0] = this.imagem;
    //this.alt = this.imgContainer.nativeElement.offsetHeight;
    //this.lar = this.imgContainer.nativeElement.offsetWidth;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.config.appLayout.isApp_SidebarLeftCollapsed) {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
        
      }
    });
    this.alt = this.imgContainer.nativeElement.offsetHeight;
    this.lar = this.imgContainer.nativeElement.offsetWidth;
  }

  ajustarTela(){
    let largura = this.imgContainer.nativeElement.offsetHeight;
    let altura = this.imgContainer.nativeElement.offsetWidth;
    this.alt = altura;
    this.lar = largura;
    if(this.imagem.altura * this.escala > altura || this.imagem.largura * this.escala > largura){
      this.escala = (((altura * 0.9) * (largura * 0.9)) * 100) / (this.imagem.altura * this.imagem.largura);
      //this.imagem.altura = altura;
      //this.imagem.largura = largura;
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
    this.pilhaIndice -= 1;
    this.imagem = this.pilha[this.pilhaIndice];
    this.config.seImgAtual(this.imagem);
  }

  refazer(){
    this.pilhaIndice += 1;
    this.imagem = this.pilha[this.pilhaIndice];
    this.config.seImgAtual(this.imagem);
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

  voltarMenu(sidenav : String){
    switch(sidenav){
      case 'negativo':
        this.negativoSidenavAberta = false;
        setTimeout( () => {
          this.negativoSidenav.toggle();
        }) 
      break;
      case 'limiar':
        this.limiarSidenavAberta = false;
        setTimeout( () => {
          this.limiarSidenav.toggle();
        }); 
        this.valorLimiar = 128;
      break;
      case 'ajusteRGB':
        this.ajusteRGBSidenavAberta = false;
        setTimeout( () => {
          this.ajusteRGBSidenav.toggle();
        }); 
        this.valorR = 0;
        this.valorG = 0;
        this.valorB = 0;
      break;
      case 'roberts':
        this.robertsSidenavAberta = false;
        setTimeout( () => {
          this.robertsSidenav.toggle();
        }) 
      break;
      default:
    
      break;
    }
    this.menu = true;
  }

  toogle(sidenav : String){
    switch(sidenav){
      case 'negativo':
        this.negativoSidenavAberta = !this.negativoSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.negativoSidenav.toggle();
        })
      break;
      case 'limiar':
        this.limiarSidenavAberta = !this.limiarSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.limiarSidenav.toggle();
        })
      break;
      case 'ajusteRGB':
        this.ajusteRGBSidenavAberta = !this.ajusteRGBSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.ajusteRGBSidenav.toggle();
        })
      break;
      case 'roberts':
        this.robertsSidenavAberta = !this.robertsSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.robertsSidenav.toggle();
        })
      break;
      default:
    
      break;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1500
    });
  }

  negativo() {
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/negativo/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.voltarMenu('negativo');
      this.openSnackBar("Sucesso!","Filtro de negativo aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      console.log(err);
    });
  }

  limiar() {
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/limiar/").concat(JSON.stringify({"valor" : this.valorLimiar})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.voltarMenu('limiar');
      this.openSnackBar("Sucesso!","Filtro de limiar aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      console.log(err);
    });
  }

  ajusteRGB() {
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/ajusteRGB/").concat(JSON.stringify({"valorR" : this.valorR,"valorG" : this.valorG, "valorB" : this.valorB})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.voltarMenu('ajusteRGB');
      this.openSnackBar("Sucesso!","Ajuste de cores aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      console.log(err);
    });
  }

  roberts() {
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/roberts/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.voltarMenu('roberts');
      this.openSnackBar("Sucesso!","Filtro de Roberts Cross aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      console.log(err);
    });
  }

  slideMudou(slide : String, event : any){
    switch(slide){
      case 'limiar':
        this.valorLimiar = event.value;
      break;
      case 'escala':
        this.escala = event.value;
      break;
      case 'canalR':
        this.valorR = event.value;
      break;
      case 'canalG':
        this.valorG = event.value;
      break;
      case 'canalB':
        this.valorB = event.value;
      break;
      default :
      break;
    }
  }
}
