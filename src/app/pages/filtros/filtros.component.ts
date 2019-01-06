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
import { Options } from 'ng5-slider';

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
  usarMedia : boolean = false;
  referencia : String = "RGB";

  @ViewChild('ajusteRGBSidenav') public ajusteRGBSidenav : MatSidenav;
  ajusteRGBSidenavAberta : boolean = false;
  valorR : number = 0;
  valorG : number = 0;
  valorB : number = 0;

  @ViewChild('robertsSidenav') public robertsSidenav : MatSidenav;
  robertsSidenavAberta : boolean = false;

  @ViewChild('prewittSidenav') public prewittSidenav : MatSidenav;
  prewittSidenavAberta : boolean = false;

  @ViewChild('sobelSidenav') public sobelSidenav : MatSidenav;
  sobelSidenavAberta : boolean = false;

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

  @ViewChild('extrairCanalSidenav') public extrairCanalSidenav : MatSidenav;
  extrairCanalSidenavAberta : boolean = false;
  extrairR : boolean = true;
  extrairG : boolean = false;
  extrairB : boolean = false;

  @ViewChild('eqCanalSidenav') public eqCanalSidenav : MatSidenav;
  eqCanalSidenavAberta : boolean = false;
  equalizarR : boolean = true;
  equalizarG : boolean = true;
  equalizarB : boolean = true;
  eqPorFaixa : boolean = false;
  minR : number = 0;
  minG : number = 0;
  minB : number = 0;
  maxR : number = 255;
  maxG : number = 255;
  maxB : number = 255;

  @ViewChild('resizeSidenav') public resizeSidenav : MatSidenav;
  resizeSidenavAberta : boolean = false;
  manterProporcao : boolean = false;
  novaLargura : number;
  novaAltura : number;

  @ViewChild('brilhoSidenav') public brilhoSidenav : MatSidenav;
  brilhoSidenavAberta : boolean = false;
  valorBrilho : number = 0;

  @ViewChild('contrasteSidenav') public contrasteSidenav : MatSidenav;
  contrasteSidenavAberta : boolean = false;
  valorContraste : number = 1;

  @ViewChild('trocarCanaisSidenav') public trocarCanaisSidenav : MatSidenav;
  trocarCanaisSidenavAberta : boolean = false;
  canaisSwap : String = "RG"

  @ViewChild('eqHistSidenav') public eqHistSidenav : MatSidenav;
  eqHistSidenavAberta : boolean = false;

  constructor(private http: HttpClient, private toastr: ToastrService,private config: ConfigService, 
    private _fb: FormBuilder,private _router: Router, 
    private changeDetectorRefs: ChangeDetectorRef, private DomSanitizer: DomSanitizer,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.imagem = this.config.getImgAtual();
    this.pilha[0] = this.imagem;
    this.larguraOriginal = this.imagem.largura;
    this.alturaOriginal = this.imagem.altura;
    this.novaLargura = this.larguraOriginal;
    this.novaAltura = this.alturaOriginal;
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
          this.usarMedia = false;
          this.referencia = "RGB";
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
        case 'prewitt':
          this.prewittSidenavAberta = false;
          setTimeout( () => {
            this.prewittSidenav.toggle();
          }) 
        break;
        case 'sobel':
          this.sobelSidenavAberta = false;
          setTimeout( () => {
            this.sobelSidenav.toggle();
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
        case 'extrairCanal':
          this.extrairCanalSidenavAberta = false;
          setTimeout( () => {
            this.extrairCanalSidenav.toggle();
          }) 
          this.extrairR = true;
          this.extrairG = false;
          this.extrairB = false;
        break;
        case 'resize':
          this.resizeSidenavAberta = false;
          setTimeout( () => {
            this.resizeSidenav.toggle();
          });
          this.manterProporcao = false;
          this.imagem.largura = this.larguraOriginal;
          this.imagem.altura = this.alturaOriginal;
        break;
        case 'brilho':
          this.brilhoSidenavAberta = false;
          setTimeout( () => {
            this.brilhoSidenav.toggle();
          }); 
          this.valorBrilho = 0;
        break;
        case 'contraste':
          this.contrasteSidenavAberta = false;
          setTimeout( () => {
            this.contrasteSidenav.toggle();
          }); 
          this.valorContraste = 1.0;
        break;
        case 'trocarCanais':
          this.trocarCanaisSidenavAberta = false;
          setTimeout( () => {
            this.trocarCanaisSidenav.toggle();
          }); 
          this.canaisSwap = "RG";
        break;
        case 'eqHist':
          this.eqHistSidenavAberta = false;
          setTimeout( () => {
            this.eqHistSidenav.toggle();
          }) 
        break;
        case 'eqCanal':
          this.eqCanalSidenavAberta = false;
          setTimeout( () => {
            this.eqCanalSidenav.toggle();
          }) 
          this.minR = 0;
          this.minG = 0;
          this.minB = 0;
          this.maxR = 255;
          this.maxG = 255;
          this.maxB = 255;
          this.eqPorFaixa = false;
          this.equalizarR = true;
          this.equalizarG = true;
          this.equalizarB = true;
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
      case 'prewitt':
        this.prewittSidenavAberta = !this.prewittSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.prewittSidenav.toggle();
        })
      break;
      case 'sobel':
        this.sobelSidenavAberta = !this.sobelSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.sobelSidenav.toggle();
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
      case 'extrairCanal':
        this.extrairCanalSidenavAberta = !this.extrairCanalSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.extrairCanalSidenav.toggle();
        })
      break;
      case 'resize':
      this.novaLargura = this.imagem.largura;
      this.novaAltura = this.imagem.altura;
        this.resizeSidenavAberta = !this.resizeSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.resizeSidenav.toggle();
        })
      break;
      case 'brilho':
        this.brilhoSidenavAberta = !this.brilhoSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.brilhoSidenav.toggle();
        })
      break;
      case 'contraste':
        this.contrasteSidenavAberta = !this.contrasteSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.contrasteSidenav.toggle();
        })
      break;
      case 'trocarCanais':
        this.trocarCanaisSidenavAberta = !this.trocarCanaisSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.trocarCanaisSidenav.toggle();
        })
      break;
      case 'eqHist':
        this.eqHistSidenavAberta = !this.eqHistSidenavAberta;
        this.menu = false;
        setTimeout( () => {
          this.eqHistSidenav.toggle();
        })
      break;
      case 'eqCanal':
        this.eqCanalSidenavAberta = !this.eqCanalSidenavAberta;
          this.menu = false;
          setTimeout( () => {
            this.eqCanalSidenav.toggle();
          })
      break;
      default:
    
      break;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(action, message, {
      duration: 1500,
      verticalPosition : 'top',
      horizontalPosition: 'center'
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
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/limiar/").concat(JSON.stringify({"valor" : this.valorLimiar, "usarMedia" : this.usarMedia, "referencia" : this.referencia})), this.imagem, {
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

  resize(){
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/redimensionar/").concat(JSON.stringify({"w" : this.novaLargura,"h" : this.novaAltura})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('resize');
      this.openSnackBar("Sucesso!","Imagem redimensionada!");
      this.imagem = response.body;
      this.alturaOriginal = this.imagem.altura;
      this.larguraOriginal = this.imagem.largura;
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
      this.openSnackBar("Sucesso!","Roberts Cross aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  sobel() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/sobel/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('sobel');
      this.openSnackBar("Sucesso!","Sobel aplicado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  prewitt() {
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/prewitt/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('prewitt');
      this.openSnackBar("Sucesso!","Prewitt aplicado");
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

  extrairCanal(){
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/extrair_canal/").concat(JSON.stringify({"R" : this.extrairR,"G" : this.extrairG, "B" : this.extrairB})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('extrairCanal');
      this.openSnackBar("Sucesso!","Extração de canal aplicada!");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  brilho(){
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/brilho/").concat(JSON.stringify({"gain" : this.valorBrilho})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('brilho');
      this.openSnackBar("Sucesso!","Brilho ajustado!");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  contraste(){
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/contraste/").concat(JSON.stringify({"gamma" : this.valorContraste})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('contraste');
      this.openSnackBar("Sucesso!","Contraste ajustado!");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  trocarCanais(){
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/trocar_canais/").concat(JSON.stringify({"canais" : this.canaisSwap})), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('trocarCanais');
      this.openSnackBar("Sucesso!","Canais trocados!");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  eqHist(){
    this.carregando = true;
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/equalizar_histograma/").concat('nada'), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('eqHist');
      this.openSnackBar("Sucesso!","Histograma equalizado");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

  eqCanal(){
    this.carregando = true;
    let parametrosURL = JSON.stringify({
      "equalizarR" : this.equalizarR,
      "equalizarG" : this.equalizarG, 
      "equalizarB" : this.equalizarB, 
      "minR" : this.minR, 
      "maxR" : this.maxR, 
      "minG" : this.minG, 
      "maxG" : this.maxG, 
      "minB" : this.minB, 
      "maxB" : this.maxB
    });
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/equalizar_canal/").concat(parametrosURL), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      this.voltarMenu('eqCanal');
      this.openSnackBar("Sucesso!","Equalização de canais aplicada");
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
      case 'brilho':
        this.valorBrilho = event.value;
      break;
      case 'contraste':
        this.valorContraste = event.value;
      break;
      default :
      break;
    }
  }

  inputMudou(input : String){
    switch(input){
      case 'novaLargura':
        if(this.manterProporcao){
          this.novaAltura =  Math.round((this.novaLargura/this.larguraOriginal) * this.alturaOriginal);
        }
        this.imagem.largura = this.novaLargura;
        this.imagem.altura = this.novaAltura;
      break;
      case 'novaAltura':
        if(this.manterProporcao){
          this.novaLargura =  Math.round((this.novaAltura / this.alturaOriginal) * this.larguraOriginal);
        }
        this.imagem.altura = this.novaAltura;
        this.imagem.largura = this.novaLargura;;
      break;
      default:
      break;
    }
  }

  checkBoxMudou(origem : String){
    switch(origem){
      case 'eqPorFaixa':
        this.minR = this.minG = this.minB = 0;
        this.maxR = this.maxG = this.maxB = 255;
      break;
      case 'equalizarR':
        this.minR = 0;
        this.maxR = 255;
      break;
      case 'equalizarG':
        this.minG = 0;
        this.maxG = 255;
      break;
      case 'equalizarB':
        this.minB = 0;
        this.maxB = 255;
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

  mock(){
    this.carregando = true;
    let parametrosURL = JSON.stringify({
      "equalizarR" : true,
      "equalizarG" : true, 
      "equalizarB" : true, 
      "minR" : 0, 
      "maxR" : 255, 
      "minG" : 0, 
      "maxG" : 255, 
      "minB" : 0, 
      "maxB" : 255
    });
    this.http.post<Imagem>(this.urlFiltros.toString().concat("/equalizar_canal/").concat(parametrosURL), this.imagem, {
      reportProgress: true,
      observe: 'response'
    }).subscribe(response => {
      this.carregando = false;
      //this.voltarMenu('negativo');
      this.openSnackBar("Sucesso!","");
      this.imagem = response.body;
      this.config.seImgAtual(this.imagem);
      this.adicionarPilha();
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }
}
