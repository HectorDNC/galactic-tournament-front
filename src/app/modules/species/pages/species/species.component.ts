import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Specie } from '../../models/specie';
import { SpeciesService } from '../../services/species.service';

@Component({
  selector: 'app-species',
  standalone: false,
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css'],
})
export class SpeciesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'powerLevel', 'specialAbility', 'createdAt'];
  dataSource = new MatTableDataSource<Specie>([]);
  loading = false;
  error: string | null = null;

  @ViewChild('tbSort') tbSort!: MatSort;

  constructor(private speciesService: SpeciesService) {}

  ngOnInit(): void {
    this.loadSpecies();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.tbSort;
  }

  loadSpecies(): void {
    this.loading = true;
    this.error = null;
    this.speciesService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar las especies.';
        this.loading = false;
      },
    });
  }
}
