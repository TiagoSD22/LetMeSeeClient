import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {HistoricoComponent} from "./historico.component";
import { MatTableModule, MatButtonModule, MatSelectModule, MatInputModule, MatTabsModule, 
  MatExpansionModule, MatCardModule,MatSliderModule, MatRadioModule,MatIconModule,
  MatSlideToggleModule,MatMenuModule,MatTooltipModule} from "@angular/material";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ModalModule } from "ngx-bootstrap";
import { WINDOW_PROVIDERS } from "../../shared/services/window.service";
//import {GoTopButtonModule} from 'ng2-go-top-button';
 
const ROTAS_Historico = [
  { path: "", component: HistoricoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    ModalModule,
    RouterModule.forChild(ROTAS_Historico)
  ],
  declarations: [HistoricoComponent],
  exports: [
    ModalModule
  ],
  providers: [ WINDOW_PROVIDERS ]
})
export class HistoricoModule { }
