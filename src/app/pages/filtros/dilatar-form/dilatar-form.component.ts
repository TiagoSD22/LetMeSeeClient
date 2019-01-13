import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'dilatar-form',
  templateUrl: './dilatar-form.component.html',
  styleUrls: ['./dilatar-form.component.scss'],
  animations: [ slideInOut ]
})
export class DilatarFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  larguraK : number = 3;
  alturaK : number = 3;
  selecaoLivre : boolean = false;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('dilatar');
  }

  ngOnInit() {
  }

  onChange(fonte : String, event){
    switch(fonte){
      case 'larguraK':
        if(!this.selecaoLivre){
          this.alturaK = event.value;
        }
        this.larguraK = event.value;
      break;
      case 'alturaK':
        if(!this.selecaoLivre){
          this.larguraK = event.value;
        }
        this.alturaK = event.value;
      break;
      default:
      break;
    }
  }

  aplicar(){
    this.carregando = true;
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'dilatar';
    let parametrosFiltro = JSON.stringify({
      "w" : this.larguraK,
      "h" : this.alturaK
    });

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'dilatar',imagemProcessada : response, msg : "Filtro de dilatação aplicado!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
