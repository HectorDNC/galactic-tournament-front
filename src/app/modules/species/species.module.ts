import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesRoutingModule } from './species-rounting.module';
import { SpeciesComponent } from './pages/species/species.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [SpeciesComponent],
  imports: [
    CommonModule,
    SpeciesRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  ],
  exports: [SpeciesRoutingModule]
})
export class SpeciesModule { }
