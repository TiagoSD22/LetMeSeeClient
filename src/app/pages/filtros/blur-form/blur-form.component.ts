import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'blur-form',
  templateUrl: './blur-form.component.html',
  styleUrls: ['./blur-form.component.scss'],
  animations: [ slideInOut ]
})
export class BlurFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();

  carregando : boolean = false;

  tamanhoMascara : number = 5;
  gaussiana : boolean = false;
  sigmaX : number = 0.0;
  sigmaY : number = 0.0;

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('blur');
  }

  onChangeMascara(event){
    this.tamanhoMascara = event.value;
  }

  onChangeSigmaX(event){
    this.sigmaX = event.value;
  }

  onChangeSigmaY(event){
    this.sigmaY = event.value;
  }

  ngOnInit() {
  }

  aplicar(){
    let nomeFiltro : string = "blur";
    let parametrosFiltro = JSON.stringify({
      "w" : this.tamanhoMascara,
      "h" : this.tamanhoMascara
    });
    let msg = "Blur aplicado!";

    if(this.gaussiana){
      nomeFiltro = "gaussian_blur";
      parametrosFiltro = JSON.stringify({
        "w" : this.tamanhoMascara,
        "h" : this.tamanhoMascara,
        "x" : this.sigmaX, 
        "y" : this.sigmaY
      });
      msg = "Gaussian Blur aplicado!";
    }

    this.carregando = true;
    this.onLoading.emit(this.carregando);
  
    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'blur',imagemProcessada : response, msg : msg});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
