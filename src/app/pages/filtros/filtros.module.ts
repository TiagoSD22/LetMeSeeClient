import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {FiltrosComponent} from "./filtros.component";
import { MatTableModule, MatButtonModule, MatSelectModule, MatInputModule, MatTabsModule, 
  MatExpansionModule, MatCardModule,MatSliderModule, MatRadioModule,MatIconModule,
  MatSlideToggleModule,MatMenuModule, MatTooltipModule,MatSidenavModule,MatListModule, MatProgressSpinnerModule} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import {MatBadgeModule} from "@angular/material/badge";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';

const ROTAS_Filtros = [
  { path: "", component: FiltrosComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSliderModule,
    FlexLayoutModule,
    DragDropModule,
    RouterModule.forChild(ROTAS_Filtros)
  ],
  declarations: [FiltrosComponent]
})
export class FiltrosModule { }
