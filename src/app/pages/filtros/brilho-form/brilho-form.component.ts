import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'brilho-form',
  templateUrl: './brilho-form.component.html',
  styleUrls: ['./brilho-form.component.scss'],
  animations: [ slideInOut ]
})
export class BrilhoFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  valorBrilho : number = 0;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('brilho');
  }

  onChange(event){
    this.valorBrilho = event.value;
  }

  ngOnInit() {
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'brilho';
    let parametrosFiltro = JSON.stringify({
      "gain" : this.valorBrilho
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'brilho',imagemProcessada : response, msg : "Brilho ajustado!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
