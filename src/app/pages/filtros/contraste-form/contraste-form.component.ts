import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'contraste-form',
  templateUrl: './contraste-form.component.html',
  styleUrls: ['./contraste-form.component.scss'],
  animations: [ slideInOut ]
})
export class ContrasteFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  valorContraste : number = 1;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('contraste');
  }

  ngOnInit() {
  }

  onChange(event){
    this.valorContraste = event.value;
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'contraste';
    let parametrosFiltro = JSON.stringify({
      "gamma" : this.valorContraste
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'contraste',imagemProcessada : response, msg : "Contraste ajustado!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
