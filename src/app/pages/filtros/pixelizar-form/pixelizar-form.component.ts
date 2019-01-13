import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'pixelizar-form',
  templateUrl: './pixelizar-form.component.html',
  styleUrls: ['./pixelizar-form.component.scss'],
  animations: [ slideInOut ]
})
export class PixelizarFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  larguraK : number = 5;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('pixelate');
  }

  ngOnInit() {
  }

  onChange(event){
    this.larguraK = event.value;
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'pixelate';
    let parametrosFiltro = JSON.stringify({
      "k" : this.larguraK
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'pixelate',imagemProcessada : response, msg : "Imagem pixelizada!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
