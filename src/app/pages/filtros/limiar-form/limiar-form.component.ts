import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'limiar-form',
  templateUrl: './limiar-form.component.html',
  styleUrls: ['./limiar-form.component.scss'],
  animations: [ slideInOut ]
})
export class LimiarFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  valorLimiar : number = 128;
  usarMedia : boolean = false;
  referencia : String = "RGB";

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('limiar');
  }

  ngOnInit() {
  }

  onChange(event){
    this.valorLimiar = event.value;
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'limiar';
    let parametrosFiltro = JSON.stringify({
      "valor" : this.valorLimiar, 
      "usarMedia" : this.usarMedia, 
      "referencia" : this.referencia
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'limiar',imagemProcessada : response, msg : "Filtro de limiar aplicado!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
