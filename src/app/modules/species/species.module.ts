import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeciesRoutingModule } from './species-rounting.module';
import { SpeciesComponent } from './pages/species/species.component';
import { SpeciesFormComponent } from './pages/species-form/species-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';

@NgModule({
  declarations: [SpeciesComponent, SpeciesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpeciesRoutingModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    ModalComponent,
    InputFieldComponent,
    LabelComponent,
  ],
  exports: [SpeciesRoutingModule]
})
export class SpeciesModule { }
