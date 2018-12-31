import { LeftSidebarComponent } from './../../layout/left-sidebar/left-sidebar.component';
import { MatSnackBarConfig } from '@angular/material';
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
  mostrarIrTopo : boolean = false;
  imgVisualizar : Imagem;
  visualizacao = false;
  backgroundDarkColor = "#0e0e0e";
  backgroundLightColor = "#FFFFFF";
  backgroundColor = this.backgroundDarkColor;

  @ViewChild('imageModal') public imageModal: ModalDirective;

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
      //this.toastr.error("Erro!", "Não foi possível obter o histórico de imagens, falha ao se comunicar com o servidor", {progressBar : true});
      this.openErrorSnackBar();
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

  openErrorSnackBar(){
    let config = new MatSnackBarConfig(); 
    config.panelClass = 'errorSnackBar';
    config.duration = -1;
    this.snackBar.open("Falha ao obter o histórico","erro",config);
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

  verImagem(img : Imagem){
    //document.getElementById('app_sidebar-left').style.visibility = "hidden";
    /*let d = document.getElementById('dialog');
    let db = document.getElementById('dialog-body');
    d.style.width = "100%";
      d.style.height = "100%";
      d.style.margin = "0px";
      db.style.height = "100%"*/
    this.visualizacao = true;
    this.imgVisualizar = img;
    this
    this.imageModal.show();
    var divObj = document.getElementById("full");
       //Use the specification method before using prefixed versions
      if (divObj.requestFullscreen) {
        divObj.requestFullscreen();
      }
      
    
  }

  fecharModal(){
    //document.getElementById('app_sidebar-left').style.visibility = "visible";
    let d = document.getElementById('dialog');
    let db = document.getElementById('dialog-body');
    //document.getElementById('dialog').removeAttribute('style');
    //document.getElementById('dialog-body').removeAttribute('style');
    this.imgVisualizar = undefined;
    this.imageModal.hide();
    this.visualizacao = false;
    //document.getElementById('app_main-menu-wrapper').style.visibility = "visible";
    //console.log("ver: " + this.visualizacao);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode == 27) {
      if (this.visualizacao) {
        this.fecharModal();
      }
    }
    else if(event.keyCode == 32){
      if (this.visualizacao) {
        this.mudarBackgroundColor();
      }
    }
  }

  mudarBackgroundColor(){
    if(this.backgroundColor == this.backgroundDarkColor){
      this.backgroundColor = this.backgroundLightColor;
    }
    else{
      this.backgroundColor = this.backgroundDarkColor;
    }
  }

  @HostListener('window:scroll', ['$event']) 
    doSomething(event) {
      // console.debug("Scroll Event", document.body.scrollTop);
      // see András Szepesházi's comment below
      console.debug("Scroll Event", window.pageYOffset );
    }
  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.mostrarIrTopo = true;
    } else {
        this.mostrarIrTopo = false;
    }
  }

// When the user clicks on the button, scroll to the top of the document
  topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 
}
