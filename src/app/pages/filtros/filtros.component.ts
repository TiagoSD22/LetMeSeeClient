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
  carregando : boolean = false;
  larguraOriginal : number;
  alturaOriginal: number;

  @ViewChild('imgContainer') imgContainer : ElementRef;
  lar : number;
  alt : number;

  @ViewChild('negativoSidenav') public negativoSidenav : MatSidenav;
  negativoSidenavAberta : boolean = false;

  @ViewChild('escalaCinzaSidenav') public escalaCinzaSidenav : MatSidenav;
  escalaCinzaSidenavAberta : boolean = false;

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

  @ViewChild('espelhoHSidenav') public espelhoHSidenav : MatSidenav;
  espelhoHSidenavAberta : boolean = false;

  @ViewChild('espelhoVSidenav') public espelhoVSidenav : MatSidenav;
  espelhoVSidenavAberta : boolean = false;

  @ViewChild('girarHSidenav') public girarHSidenav : MatSidenav;
  girarHSidenavAberta : boolean = false;

  @ViewChild('girarAHSidenav') public girarAHSidenav : MatSidenav;
  girarAHSidenavAberta : boolean = false;

  @ViewChild('dilatarSidenav') public dilatarSidenav : MatSidenav;
  dilatarSidenavAberta : boolean = false;

  @ViewChild('erodirSidenav') public erodirSidenav : MatSidenav;
  erodirSidenavAberta : boolean = false;
  larguraK : number = 3;
  alturaK : number = 3;
  selecaoLivre : boolean = false;

  @ViewChild('medianaSidenav') public medianaSidenav : MatSidenav;
  medianaSidenavAberta : boolean = false;

  @ViewChild('blurSidenav') public blurSidenav : MatSidenav;
  blurSidenavAberta : boolean = false;
  gaussiana : boolean = false;
  sigmaX : number = 0.0;
  sigmaY : number = 0.0;

  constructor(private http: HttpClient, private toastr: ToastrService,private config: ConfigService, 
    private _fb: FormBuilder,private _router: Router, 
    private changeDetectorRefs: ChangeDetectorRef, private DomSanitizer: DomSanitizer,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.imagem = this.config.getImgAtual();
    this.pilha[0] = this.imagem;
    this.larguraOriginal = this.imagem.largura;
    this.alturaOriginal = this.imagem.altura;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.config.appLayout.isApp_SidebarLeftCollapsed) {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
      }
    });
  }

  ajustarTela(){
    console.log("Distancia: " + document.getElementById('image').offsetTop);
    let altura = document.getElementById('img-container').offsetHeight * 1.1;
    let largura = document.getElementById('img-container').offsetWidth * 1.1;
    document.getElementById('image').style.transform = "translate3d(0px, 0px, 0px)";
    if(this.alturaOriginal * this.escala > altura || this.larguraOriginal * this.escala > largura){
      if(this.larguraOriginal < largura && this.alturaOriginal < altura){
        this.escala = 1;
      }
      else{
        this.escala = (0.9 * altura * largura) / (this.alturaOriginal* this.larguraOriginal);
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

  voltarMenu(sidenav : String){
    if(!this.carregando){
      switch(sidenav){
        case 'negativo':
          this.negativoSidenavAberta = false;
          setTimeout( () => {
            this.negativoSidenav.toggle();
          }) 
        break;
        case 'escalaCinza':
          this.escalaCinzaSidenavAberta = false;
          setTimeout( () => {
            this.escalaCinzaSidenav.toggle();
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
        case 'espelhoH':
          this.espelhoHSidenavAberta = false;
          setTimeout( () => {
            this.espelhoHSidenav.toggle();
          }) 
        break;
        case 'espelhoV':
          this.espelhoVSidenavAberta = false;
          setTimeout( () => {
            this.espelhoVSidenav.toggle();
          }) 
        break;
        case 'girarH':
          this.girarHSidenavAberta = false;
          setTimeout( () => {
            this.girarHSidenav.toggle();
          }) 
        break;
        case 'girarAH':
          this.girarAHSidenavAberta = false;
          setTimeout( () => {
            this.girarAHSidenav.toggle();
          }) 
        break;
        case 'dilatar':
          this.dilatarSidenavAberta = false;
          setTimeout( () => {
            this.dilatarSidenav.toggle();
          });
          this.larguraK = 3;
          this.alturaK = 3; 
          this.selecaoLivre = false;
        break;
        case 'erodir':
          this.erodirSidenavAberta = false;
          setTimeout( () => {
            this.erodirSidenav.toggle();
          });
          this.larguraK = 3;
          this.alturaK = 3; 
          this.selecaoLivre = false;
        break;
        case 'mediana':
          this.medianaSidenavAberta = false;
          setTimeout( () => {
            this.medianaSidenav.toggle();
          });
          this.larguraK = 3; 
        break;
        case 'blur':
          this.blurSidenavAberta = false;
          setTimeout( () => {
            this.blurSidenav.toggle();
          });
          this.larguraK = 3;
          this.gaussiana = false; 
          this.sigmaX = 0;
          this.sigmaY = 0;
        break;
        default:
      
        break;
      }
      this.menu = true;
    }
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
      case 'escalaCinza':
        this.escalaCinzaSidenavAberta = !this.escalaCinzaSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.escalaCinzaSidenav.toggle();
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
      case 'espelhoH':
        this.espelhoHSidenavAberta = !this.espelhoHSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.espelhoHSidenav.toggle();
        })
      break;
      case 'espelhoV':
        this.espelhoVSidenavAberta = !this.espelhoVSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.espelhoVSidenav.toggle();
        })
      break;
      case 'girarH':
        this.girarHSidenavAberta = !this.girarHSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.girarHSidenav.toggle();
        })
      break;
      case 'girarAH':
        this.girarAHSidenavAberta = !this.girarAHSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.girarAHSidenav.toggle();
        })
      break;
      case 'dilatar':
        this.dilatarSidenavAberta = !this.dilatarSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.dilatarSidenav.toggle();
        })
      break;
      case 'erodir':
        this.erodirSidenavAberta = !this.erodirSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.erodirSidenav.toggle();
        })
      break;
      case 'mediana':
      this.larguraK = 5;
        this.medianaSidenavAberta = !this.medianaSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.medianaSidenav.toggle();
        })
      break;
      case 'blur':
      this.larguraK = 5;
        this.blurSidenavAberta = !this.blurSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.blurSidenav.toggle();
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
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/negativo/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('negativo');
      this.openSnackBar("Sucesso!","Filtro de negativo aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  escalaCinza() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/escala_cinza/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('escalaCinza');
      this.openSnackBar("Sucesso!","Filtro de escala de cinza aplicado!");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  limiar() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/limiar/").concat(JSON.stringify({"valor" : this.valorLimiar})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('limiar');
      this.openSnackBar("Sucesso!","Filtro de limiar aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  ajusteRGB() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/ajusteRGB/").concat(JSON.stringify({"valorR" : this.valorR,"valorG" : this.valorG, "valorB" : this.valorB})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('ajusteRGB');
      this.openSnackBar("Sucesso!","Ajuste de cores aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  mock(){
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/sobel/").concat(JSON.stringify({"w" : 1640,"h" : 2240})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('negativo');
      this.openSnackBar("Sucesso!","");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  roberts() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/roberts/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('roberts');
      this.openSnackBar("Sucesso!","Filtro de Roberts Cross aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  espelhoH() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/espelhoH/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('espelhoH');
      this.openSnackBar("Sucesso!","Espelho horizontal aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  espelhoV() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/espelhoV/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('espelhoV');
      this.openSnackBar("Sucesso!","Espelho vertical aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  girarH() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/girarH/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('girarH');
      this.openSnackBar("Sucesso!","Rotação horária aplicada");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  girarAH() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/girarAH/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('girarAH');
      this.openSnackBar("Sucesso!","Rotação anti-horária aplicada");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  dilatar() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/dilatar/").concat(JSON.stringify({"w" : this.larguraK,"h" : this.alturaK})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('dilatar');
      this.openSnackBar("Sucesso!","Dilatação aplicada");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  erodir() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/erodir/").concat(JSON.stringify({"w" : this.larguraK,"h" : this.alturaK})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('erodir');
      this.openSnackBar("Sucesso!","Erosão aplicada");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  mediana() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/mediana/").concat(JSON.stringify({"k" : this.larguraK})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('mediana');
      this.openSnackBar("Sucesso!","Mediana aplicada");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  blur(){
    this.carregando = true;
    let filtro : String = "blur";
    let parametros = JSON.stringify({"w" : this.larguraK,"h" : this.larguraK});
    let msg = "Blur aplicado!";
    if(this.gaussiana){
      filtro = "gaussian_blur";
      parametros = JSON.stringify({"w" : this.larguraK,"h" : this.larguraK,"x" : this.sigmaX, "y" : this.sigmaY});
      msg = "Gaussian Blur aplicado!";
    }
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/" + filtro + "/").concat(parametros), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('blur');
      this.openSnackBar("Sucesso!",msg);
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
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
      case 'larguraK':
        if(!this.selecaoLivre){
          this.alturaK = event.value;
        }
        this.larguraK = event.value;
      break;
      case 'alturaK':
        if(!this.selecaoLivre){
          this.larguraK = event.value;
        }
        this.alturaK = event.value;
      break;
      case 'mediana':
        this.larguraK = event.value;
      break;
      default :
      break;
    }
  }

  inputMudou(input : String){
    switch(input){
      case 'dilatarW':
        if(this.larguraK < 2){
          this.larguraK = 2;
        }
      break;
      case 'dilatarH':
        if(this.alturaK < 2){
          this.alturaK = 2;
        }
      break;
      default:
      break;
    }
  }

  ngOnDestroy(): void {
    if(this.carregando){
      this.carregando = false;
    }
  }
}
