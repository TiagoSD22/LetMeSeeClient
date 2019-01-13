import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Imagem } from './../imagem';
import { ConfigService } from '../../shared/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private urlFiltros : string = this.config.app.urlBase.concat("/aplicarFiltro/");

  constructor(private config: ConfigService, private http: HttpClient) { }

  requisitarFiltro(nomeFiltro : string, parametrosFiltro : string, img : Imagem){
    return this.http.post<Imagem>(this.urlFiltros.toString() +nomeFiltro+'/'+parametrosFiltro, img);
  }
}
