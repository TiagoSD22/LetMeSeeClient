import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {UploadImageComponent} from "./upload-image.component";
import { MatTableModule, MatButtonModule, MatSelectModule, MatInputModule, MatTabsModule, 
  MatExpansionModule, MatCardModule,MatSliderModule, MatRadioModule,MatIconModule,
  MatSlideToggleModule,MatMenuModule } from "@angular/material";
import {MatSnackBarModule} from '@angular/material/snack-bar';

const ROTAS_UploadImage = [
  { path: "", component: UploadImageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSliderModule,
    RouterModule.forChild(ROTAS_UploadImage)
  ],
  declarations: [UploadImageComponent]
})
export class UploadImageModule { }
