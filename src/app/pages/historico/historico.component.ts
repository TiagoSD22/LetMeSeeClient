import { MatSnackBar } from '@angular/material';
import { Component, OnInit,AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/services/config/config.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from "@angular/common";
import { HostListener } from "@angular/core";
import 'rxjs/add/observable/interval';
import { MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {Imagem} from "../imagem";

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  
  historicoUrl : String = this.config.app.urlBase.concat("/historico");
  imagens : Imagem[] = [];
  normalSnackBarAberta : boolean = false;
  EmptySnackBarAberta : boolean = false;

  constructor(private http: HttpClient, private toastr: ToastrService,private config: ConfigService, 
    private _fb: FormBuilder,private _router: Router, 
    private changeDetectorRefs: ChangeDetectorRef, private DomSanitizer: DomSanitizer,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.carregarHistorico();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.config.appLayout.isApp_SidebarLeftCollapsed) {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
      }
    });
  }

  carregarHistorico(){
    this.http.get<Imagem[]>(this.historicoUrl.concat("/obterHistorico"), {observe : 'response'})
    .subscribe(response =>{
      this.imagens = response.body;
      if(this.imagens.length == 0){
        this.ShowEmptySnackBar();
      }
    }, err => {
      this.toastr.error("Erro!", "Não foi possível obter o histórico de imagens, falha ao se comunicar com o servidor", {progressBar : true});
    })
  }

  salvarImagem(img : Imagem){
    const a = document.createElement('a');    
    var image_data = atob(img.conteudoBase64.toString());
    var arraybuffer = new ArrayBuffer(image_data.length);
    var view = new Uint8Array(arraybuffer);
    for (var i=0; i<image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
    }
    a.href = window.URL.createObjectURL(new Blob([arraybuffer], {type: 'application/octet-stream'}));
    a.download = img.nome.toString().concat('.').concat(img.tipo.toString());
    document.body.appendChild(a);
    a.click()
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
    this.normalSnackBarAberta = true;
  }

  ShowEmptySnackBar(){
    this.snackBar.open("Histórico vazio", "Não há imagens no histórico",{
      duration: -1
    });
    this.EmptySnackBarAberta = true;
  }

  editarImagem(img : Imagem){
    this.config.seImgAtual(img);
    this._router.navigate(['/filtros']);
  }

  excluirImagem(img : Imagem){
    swal({
      title: 'Excluir imagem ' + img.nome,
      text: "Deseja realmente apagar esta imagem?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3C7FCA',
      cancelButtonColor: 'rgb(40,48,63)',
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.http.delete(this.historicoUrl.concat("/excluirImagem/") + img.id, {observe : 'response', responseType : 'text'})
        .subscribe(response => {
          this.carregarHistorico();
          //this.toastr.success("Sucesso!","Imagem removida do histórico!", {progressBar : true});
          if(this.imagens.length == 0 || img == this.config.getImgAtual()){
            this.config.seImgAtual(undefined);
          }
          this.openSnackBar("Sucesso!", "Imagem excluída com sucesso!");
        }, err =>{
          this.toastr.error("Erro!","Não foi possível completar esta ação!", {progressBar:true});
        });
      }
    });
  }

  limparHistorico(){
    swal({
      title: 'Limpar histórico de fotos',
      text: "Deseja apagar todas as fotos do histórico? Você não poderá recuperá-las!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3C7FCA',
      cancelButtonColor: 'rgb(40,48,63)',
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.http.get(this.historicoUrl.concat('/limparHistorico'), {observe : 'response', responseType: 'text'})
        .subscribe(response =>{
          console.log(response.body);
          this.imagens = [];
          this.config.seImgAtual(undefined);
          //this.toastr.success("Sucesso!","Histórico apagado!", {progressBar : true});
          this.openSnackBar("Sucesso!", "Histórico apagado com sucesso!");
        }, err =>{
          console.log(err);
          this.toastr.error("Erro!","Não foi possível completar esta ação!", {progressBar:true});
        });
      }
    });
  }

  ngOnDestroy(): void {
    //if(this.EmptySnackBarAberta || this.normalSnackBarAberta)
      //this.snackBar._openedSnackBarRef.dismiss();
  }
}