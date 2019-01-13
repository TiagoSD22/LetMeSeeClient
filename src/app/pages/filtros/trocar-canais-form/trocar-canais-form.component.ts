import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'trocar-canais-form',
  templateUrl: './trocar-canais-form.component.html',
  styleUrls: ['./trocar-canais-form.component.scss'],
  animations: [ slideInOut ]
})
export class TrocarCanaisFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  canaisSwap : String = "RG"

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('trocarCanais');
  }

  ngOnInit() {
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'trocar_canais';
    let parametrosFiltro = JSON.stringify({
      "canais" : this.canaisSwap
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'trocarCanais',imagemProcessada : response, msg : "Canais trocados!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
