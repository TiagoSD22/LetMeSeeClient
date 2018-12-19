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
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  uploadUrl : String = this.config.app.urlBase.concat("/upload");
  arquivoSelecionado : File;

  constructor(private http: HttpClient, private toastr: ToastrService,private config: ConfigService, 
              private _fb: FormBuilder,private _router: Router, 
              private changeDetectorRefs: ChangeDetectorRef, private DomSanitizer: DomSanitizer,public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.config.appLayout.isApp_SidebarLeftCollapsed) {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass : ['style-succes']
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.arquivoSelecionado = event.target.files[0];
      const uploadData = new FormData();
      var reader = new FileReader();
      reader.readAsDataURL(this.arquivoSelecionado);
      reader.onload = (evento) => { 
        uploadData.append('conteudo',reader.result.toString());
        uploadData.append('formato',this.arquivoSelecionado.type.split('/')[1]);
        uploadData.append('nome',this.arquivoSelecionado.name.split('.')[0]);
        this.http.post<Imagem>(this.uploadUrl.toString(), uploadData, {
          reportProgress: true,
          observe: 'response'
        }).subscribe(response => {
            //this.toastr.success("Imagem carregada!", "Sucesso", { progressBar: true });
            this.openSnackBar("Sucesso!", "Imagem carregada com sucesso!");
            let imgAtual : Imagem = response.body;
            this.config.seImgAtual(imgAtual);
            this._router.navigate(['/filtros']);
            
          }, err =>{
            console.log(err);
          }); 
      }
    }
  }
}

