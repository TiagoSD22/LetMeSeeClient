import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'extrair-canal-form',
  templateUrl: './extrair-canal-form.component.html',
  styleUrls: ['./extrair-canal-form.component.scss'],
  animations: [ slideInOut ]
})
export class ExtrairCanalFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  extrairR : boolean = true;
  extrairG : boolean = false;
  extrairB : boolean = false;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('extrairCanal');
  }

  ngOnInit() {
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'extrair_canal';
    let parametrosFiltro = JSON.stringify({
      "R" : this.extrairR,
      "G" : this.extrairG, 
      "B" : this.extrairB
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'extrairCanal',imagemProcessada : response, msg : "Extração de canal aplicada!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
