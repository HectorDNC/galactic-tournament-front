import { Component, OnInit, HostListener } from '@angular/core';
import { Specie } from '../../../species/models/specie';
import { SpeciesService } from '../../../species/services/species.service';
import { BattleService } from '../../services/battle.service';
import { BattleResult } from '../../models/battle';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-battle',
  standalone: false,
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
})
export class BattleComponent implements OnInit {
  loadingSpecies = false;

  // Left fighter
  leftSearch = '';
  leftFiltered: Specie[] = [];
  leftDropdownOpen = false;
  fighterLeft: Specie | null = null;

  // Right fighter
  rightSearch = '';
  rightFiltered: Specie[] = [];
  rightDropdownOpen = false;
  fighterRight: Specie | null = null;

  // Battle state
  fighting = false;
  fightingRandom = false;
  result: BattleResult | null = null;
  error: string | null = null;
  showRandomConfirm = false;

  constructor(
    private _speciesService: SpeciesService,
    private _battleService: BattleService,
    private _alertService: AlertService

  ) {}

  ngOnInit(): void {
    
  }

  // --- Left fighter ---
  onLeftSearchChange(): void {
    const term = this.leftSearch.trim();

    this._speciesService.findAll(0, 10, term).subscribe({
      next: (page) => {
        this.leftFiltered = page.content.filter(s => s.id !== this.fighterRight?.id);
        this.leftDropdownOpen = this.leftFiltered.length > 0;
      },
      error: () => {
        this.leftFiltered = [];
        this.leftDropdownOpen = false;
      }
    });
  }

  selectFighterLeft(specie: Specie): void {
    this.fighterLeft = specie;
    this.leftSearch = specie.name;
    this.leftDropdownOpen = false;
    this.result = null;
    this.error = null;
  }

  clearLeft(): void {
    this.fighterLeft = null;
    this.leftSearch = '';
    this.leftFiltered = [];
    this.leftDropdownOpen = false;
    this.result = null;
  }

  // --- Right fighter ---
  onRightSearchChange(): void {
    const term = this.rightSearch.trim();

    this._speciesService.findAll(0, 10, term).subscribe({
      next: (page) => {
        this.rightFiltered = page.content.filter(s => s.id !== this.fighterLeft?.id);
        this.rightDropdownOpen = this.rightFiltered.length > 0;
      },
      error: () => {
        this.rightFiltered = [];
        this.rightDropdownOpen = false;
      }
    });
  }

  selectFighterRight(specie: Specie): void {
    this.fighterRight = specie;
    this.rightSearch = specie.name;
    this.rightDropdownOpen = false;
    this.result = null;
    this.error = null;
  }

  clearRight(): void {
    this.fighterRight = null;
    this.rightSearch = '';
    this.rightFiltered = [];
    this.rightDropdownOpen = false;
    this.result = null;
  }

  // --- Battle ---
  get canFight(): boolean {
    return !!this.fighterLeft && !!this.fighterRight && !this.fighting;
  }

  startBattle(): void {
    if (!this.fighterLeft || !this.fighterRight) return;
    this.fighting = true;
    this.result = null;
    this.error = null;

    this._battleService
      .start({ fighterLeftId: this.fighterLeft.id, fighterRightId: this.fighterRight.id })
      .subscribe({
        next: (res) => {
          this.result = res;
          this.fighting = false;
          this._alertService.success(`Batalla realizada! Ganador: ${res.winner.name}`);
        },
        error: (error) => {
          this.fighting = false;
          this._alertService.error('Error al realizar la batalla');
        },
      });
  }

  isWinner(specie: Specie | null): boolean {
    return !!this.result && !!specie && this.result.winner.id === specie.id;
  }

  resetBattle(): void {
    this.fighterLeft = null;
    this.leftSearch = '';
    this.fighterRight = null;
    this.rightSearch = '';
    this.result = null;
    this.error = null;
  }

  // Abre modal de confirmación
  generateRandomBattle(): void {
    this.showRandomConfirm = true;
  }

  // Ejecuta la petición al backend para generar combate aleatorio
  performRandomBattle(): void {
    this.showRandomConfirm = false;
    this.fighting = true;
    this.fightingRandom = true;
    this.result = null;
    this.error = null;
    this.clearLeft();
    this.clearRight();

    this._battleService.randomBattle().subscribe({
      next: (res) => {
        this.selectFighterLeft(res.fighterLeft);
        this.selectFighterRight(res.fighterRight);
        this.result = res;
        this.fighting = false;
        this.fightingRandom = false;
        this._alertService.success(`Batalla aleatoria realizada! Ganador: ${res.winner.name}`);
      },
      error: (error) => {
        this.fighting = false;
        this.fightingRandom = false;  
        this._alertService.error('Error al generar la batalla aleatoria');
      },
    });
  }

  cancelRandomBattle(): void {
    this.showRandomConfirm = false;
  }

  // Cerrar dropdowns al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.fighter-search-left')) {
      this.leftDropdownOpen = false;
    }
    if (!target.closest('.fighter-search-right')) {
      this.rightDropdownOpen = false;
    }
  }
}
