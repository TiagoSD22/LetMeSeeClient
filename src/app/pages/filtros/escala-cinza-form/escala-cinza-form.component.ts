import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'escala-cinza-form',
  templateUrl: './escala-cinza-form.component.html',
  styleUrls: ['./escala-cinza-form.component.scss'],
  animations: [ slideInOut ]
})
export class EscalaCinzaFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  constructor(private filtrosService : FiltrosService) { }

  ngOnInit() {
  }

  voltarMenu(){
    this.onVoltar.emit('escalaCinza');
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'escala_cinza';
    let parametrosFiltro = 'none';

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'escalaCinza',imagemProcessada : response, msg : "Filtro de escala de cinza aplicado!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
