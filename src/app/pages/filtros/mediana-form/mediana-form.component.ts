import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'mediana-form',
  templateUrl: './mediana-form.component.html',
  styleUrls: ['./mediana-form.component.scss'],
  animations: [ slideInOut ]
})
export class MedianaFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  tamanhoMascara : number = 5;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('mediana');
  }

  onChange(event){
    this.tamanhoMascara = event.value;
  }

  ngOnInit() {
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'mediana';
    let parametrosFiltro = JSON.stringify({
      "k" : this.tamanhoMascara
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'mediana',imagemProcessada : response, msg : "Mediana aplicada!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
