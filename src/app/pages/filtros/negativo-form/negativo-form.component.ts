import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'negativo-form',
  templateUrl: './negativo-form.component.html',
  styleUrls: ['./negativo-form.component.scss'],
  animations: [ slideInOut ]
})
export class NegativoFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  constructor(private filtrosService : FiltrosService) { }

  ngOnInit() {
  }

  voltarMenu(){
    this.onVoltar.emit('negativo');
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'negativo';
    let parametrosFiltro = 'none';

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'negativo',imagemProcessada : response, msg : "Filtro de negativo aplicado!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
