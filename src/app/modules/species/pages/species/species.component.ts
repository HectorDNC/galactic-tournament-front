import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Specie } from '../../models/specie';
import { SpeciesService } from '../../services/species.service';

@Component({
  selector: 'app-species',
  standalone: false,
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css'],
})
export class SpeciesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'powerLevel', 'specialAbility', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Specie>([]);

  totalPages = 1;
  currentPage = 1;
  pageSize = 10;
  loading = false;
  error: string | null = null;

  isModalOpen = false;
  selectedSpeciesId?: number;

  @ViewChild('tbSort') tbSort!: MatSort;

  constructor(private speciesService: SpeciesService) {}

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.loadSpecies();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.tbSort;
  }

  loadSpecies(): void {
    this.loading = true;
    this.error = null;
    
    this.speciesService.findAll(this.currentPage - 1, this.pageSize).subscribe({
      next: (data) => {
        this.dataSource.data = data.content;
        this.totalPages = data.page.totalPages;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar las especies.';
        this.loading = false;
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadSpecies();
  }

  openCreateModal(): void {
    this.selectedSpeciesId = undefined;
    this.isModalOpen = true;
  }

  openEditModal(id: number): void {
    this.selectedSpeciesId = id;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSpeciesSaved(): void {
    this.currentPage = 1;
    this.loadSpecies();
  }
}
