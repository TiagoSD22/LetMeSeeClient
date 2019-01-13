import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'equalizar-histograma-form',
  templateUrl: './equalizar-histograma-form.component.html',
  styleUrls: ['./equalizar-histograma-form.component.scss'],
  animations: [ slideInOut ]
})
export class EqualizarHistogramaFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('eqHist');
  }

  ngOnInit() {
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'equalizar_histograma';
    let parametrosFiltro = 'none';

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'eqHist',imagemProcessada : response, msg : "Histograma equalizado!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
