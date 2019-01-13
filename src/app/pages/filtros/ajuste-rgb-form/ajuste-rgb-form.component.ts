import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'ajuste-rgb-form',
  templateUrl: './ajuste-rgb-form.component.html',
  styleUrls: ['./ajuste-rgb-form.component.scss'],
  animations: [ slideInOut ]
})
export class AjusteRgbFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  valorR : number = 0;
  valorG : number = 0;
  valorB : number = 0;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('ajusteRGB');
  }

  onChangeR(event){
    this.valorR = event.value;
  }

  onChangeG(event){
    this.valorG = event.value;
  }

  onChangeB(event){
    this.valorB = event.value;
  }

  ngOnInit() {
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'ajusteRGB';
    let parametrosFiltro = JSON.stringify({
      "valorR" : this.valorR,
      "valorG" : this.valorG, 
      "valorB" : this.valorB
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'ajusteRGB',imagemProcessada : response, msg : "Ajuste de cores aplicado!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
