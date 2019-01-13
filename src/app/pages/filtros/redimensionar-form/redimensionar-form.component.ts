import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'redimensionar-form',
  templateUrl: './redimensionar-form.component.html',
  styleUrls: ['./redimensionar-form.component.scss'],
  animations: [ slideInOut ]
})
export class RedimensionarFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem; 
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();
  @Output('update') update : EventEmitter<{novaLargura : number, novaAltura : number}> = new EventEmitter();
  @Output('restaurar') restaurar : EventEmitter<{largura : number, altura : number}> = new EventEmitter();
  
  carregando : boolean = false;

  manterProporcao : boolean = false;
  novaLargura : number;
  novaAltura : number;
  alturaOriginal : number;
  larguraOriginal : number;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('resize');
    this.devolverDimensoesOriginais();
  }

  devolverDimensoesOriginais(){
    this.restaurar.emit({largura : this.larguraOriginal, altura : this.alturaOriginal});
  }

  inputMudou(input : String){
    switch(input){
      case 'novaLargura':
        if(this.manterProporcao){
          this.novaAltura =  Math.round((this.novaLargura/this.larguraOriginal) * this.alturaOriginal);
        }
      break;
      case 'novaAltura':
        if(this.manterProporcao){
          this.novaLargura =  Math.round((this.novaAltura / this.alturaOriginal) * this.larguraOriginal);
        }
      break;
      default:
      break;
    }
    this.update.emit({novaLargura : this.novaLargura, novaAltura : this.novaAltura});
  }

  ngOnInit() {
    this.larguraOriginal = this.imagem.largura;
    this.alturaOriginal = this.imagem.altura;
    this.novaLargura = this.larguraOriginal;
    this.novaAltura = this.alturaOriginal;
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'redimensionar';
    let parametrosFiltro = JSON.stringify({
      "w" : this.novaLargura,
      "h" : this.novaAltura
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'resize',imagemProcessada : response, msg : "Imagem redimensionada!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
