import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'equalizar-canal-form',
  templateUrl: './equalizar-canal-form.component.html',
  styleUrls: ['./equalizar-canal-form.component.scss'],
  animations: [ slideInOut ]
})
export class EqualizarCanalFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

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

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('eqCanal');
  }

  ngOnInit() {
  }

  onChange(origem : String){
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

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'equalizar_canal';
    let parametrosFiltro = JSON.stringify({
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

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'eqCanal',imagemProcessada : response, msg : "Equalização de canal aplicada!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
