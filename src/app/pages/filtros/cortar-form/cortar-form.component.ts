import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Imagem } from './../../imagem';
import { FiltrosService } from './../filtros-service.service';
import {slideInOut} from "../animation";

@Component({
  selector: 'cortar-form',
  templateUrl: './cortar-form.component.html',
  styleUrls: ['./cortar-form.component.scss'],
  animations: [ slideInOut ]
})
export class CortarFormComponent implements OnInit {

  @Input('imagem') imagem : Imagem;
  @Input('cropper') imageCropper;
  @Output('filtroAplicado') onFiltroAplicado : EventEmitter<{filtro : String, imagemProcessada : Imagem, msg : String}> = new EventEmitter();
  @Output('onLoading') onLoading : EventEmitter<boolean> = new EventEmitter();
  @Output('voltar') onVoltar : EventEmitter<String> = new EventEmitter();
  @Output('update') update : EventEmitter<{manterAspecto : boolean, formatoCorte : String}> = new EventEmitter();
  @Output('show') showCropper : EventEmitter<boolean> = new EventEmitter();

  carregando : boolean = false;

  manterAspecto : boolean = true;
  formatoCorte : String = 'retangular';
  modoCorte : String = "cortar";

  constructor(private filtrosService : FiltrosService) { }

  voltarMenu(){
    this.onVoltar.emit('crop');
  }

  onChange(){
    this.update.emit({manterAspecto : this.manterAspecto, formatoCorte : this.formatoCorte});
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.showCropper.emit(false);
  }

  ngAfterViewInit(): void {
    this.showCropper.emit(true);
  }

  aplicar(){
    this.carregando = true;
    let evento = this.imageCropper.crop();
    this.onLoading.emit(this.carregando);
    let nomeFiltro = 'cortar';
    let parametrosFiltro = JSON.stringify({
      "tipoCorte" : this.formatoCorte,
      "modo" : this.modoCorte,
      "x1" : evento.imagePosition.x1,
      "y1" : evento.imagePosition.y1,
      "w" : evento.width,
      "h" : evento.height
    })

    this.filtrosService.requisitarFiltro(nomeFiltro,parametrosFiltro,this.imagem).subscribe(response => {
      this.carregando = false;
      this.onFiltroAplicado.emit({filtro : 'crop', imagemProcessada : response, msg : "Imagem cortada!"});
    }, err => {
      this.carregando = false;
      console.log(err);
    });
  }

}
