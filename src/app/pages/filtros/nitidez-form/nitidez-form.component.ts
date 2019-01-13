import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'nitidez-form',
  templateUrl: './nitidez-form.component.html',
  styleUrls: ['./nitidez-form.component.scss'],
  animations: [ slideInOut ]
})
export class NitidezFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  fatorNitidez : number = 0.0;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('nitidez');
  }

  ngOnInit() {
  }

  onChange(event){
    this.fatorNitidez = event.value;
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'nitidez';
    let parametrosFiltro = JSON.stringify({
      "fator" : this.fatorNitidez
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'nitidez',imagemProcessada : response, msg : "Nitidez ajustada!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
