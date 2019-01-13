import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {FiltrosComponent} from "./filtros.component";
import { MatTableModule, MatButtonModule, MatSelectModule, MatInputModule, MatTabsModule, 
  MatExpansionModule, MatCardModule,MatSliderModule, MatRadioModule,MatIconModule,
  MatSlideToggleModule,MatMenuModule, MatTooltipModule,MatSidenavModule,MatListModule, MatProgressSpinnerModule,MatCheckboxModule} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import {MatBadgeModule} from "@angular/material/badge";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Ng5SliderModule} from '../../../../node_modules/ng5-slider';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CanvasWhiteboardModule} from "ng2-canvas-whiteboard";
import { NegativoFormComponent } from './negativo-form/negativo-form.component';
import { EscalaCinzaFormComponent } from './escala-cinza-form/escala-cinza-form.component';
import { LimiarFormComponent } from './limiar-form/limiar-form.component';
import { DilatarFormComponent } from './dilatar-form/dilatar-form.component';
import { ErodirFormComponent } from './erodir-form/erodir-form.component';
import { ExtrairCanalFormComponent } from './extrair-canal-form/extrair-canal-form.component';
import { TrocarCanaisFormComponent } from './trocar-canais-form/trocar-canais-form.component';
import { PixelizarFormComponent } from './pixelizar-form/pixelizar-form.component';
import { ContrasteFormComponent } from './contraste-form/contraste-form.component';
import { BrilhoFormComponent } from './brilho-form/brilho-form.component';
import { AjusteRgbFormComponent } from './ajuste-rgb-form/ajuste-rgb-form.component';
import { NitidezFormComponent } from './nitidez-form/nitidez-form.component';
import { MedianaFormComponent } from './mediana-form/mediana-form.component';
import { BlurFormComponent } from './blur-form/blur-form.component';
import { EqualizarHistogramaFormComponent } from './equalizar-histograma-form/equalizar-histograma-form.component';
import { EqualizarCanalFormComponent } from './equalizar-canal-form/equalizar-canal-form.component';
import { RedimensionarFormComponent } from './redimensionar-form/redimensionar-form.component';
import { EspelhoHorizontalFormComponent } from './espelho-horizontal-form/espelho-horizontal-form.component';
import { EspelhoVerticalFormComponent } from './espelho-vertical-form/espelho-vertical-form.component';
import { RotacaoHorariaFormComponent } from './rotacao-horaria-form/rotacao-horaria-form.component';
import { RotacaoAntiHorariaFormComponent } from './rotacao-anti-horaria-form/rotacao-anti-horaria-form.component';
import { RobertsCrossFormComponent } from './roberts-cross-form/roberts-cross-form.component';
import { PrewittFormComponent } from './prewitt-form/prewitt-form.component';
import { SobelFormComponent } from './sobel-form/sobel-form.component';
import { CortarFormComponent } from './cortar-form/cortar-form.component';

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
    MatCheckboxModule,
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
    ImageCropperModule,
    Ng5SliderModule,
    CanvasWhiteboardModule,
    RouterModule.forChild(ROTAS_Filtros)
  ],
  declarations: [FiltrosComponent, NegativoFormComponent, EscalaCinzaFormComponent, LimiarFormComponent, DilatarFormComponent, ErodirFormComponent, ExtrairCanalFormComponent, TrocarCanaisFormComponent, PixelizarFormComponent, ContrasteFormComponent, BrilhoFormComponent, AjusteRgbFormComponent, NitidezFormComponent, MedianaFormComponent, BlurFormComponent, EqualizarHistogramaFormComponent, EqualizarCanalFormComponent, RedimensionarFormComponent, EspelhoHorizontalFormComponent, EspelhoVerticalFormComponent, RotacaoHorariaFormComponent, RotacaoAntiHorariaFormComponent, RobertsCrossFormComponent, PrewittFormComponent, SobelFormComponent, CortarFormComponent]
})
export class FiltrosModule { }
