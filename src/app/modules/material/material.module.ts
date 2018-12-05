import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatExpansionModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  exports: [
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  declarations: []
})
export class MaterialModule { }
