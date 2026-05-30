import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeciesService } from '../../services/species.service';

@Component({
  selector: 'app-species-form',
  standalone: false,
  templateUrl: './species-form.component.html',
})
export class SpeciesFormComponent implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() speciesId?: number;

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  saving = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private speciesService: SpeciesService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      powerLevel: [null, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      specialAbility: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  get isEditMode(): boolean {
    return !!this.speciesId;
  }

  get nameControl() { return this.form.get('name')!; }
  get powerLevelControl() { return this.form.get('powerLevel')!; }
  get specialAbilityControl() { return this.form.get('specialAbility')!; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.form.reset();
        this.error = null;
        if (this.speciesId) {
          this.loadSpecies();
        }
      }
    }
    // Si cambia el ID mientras el modal ya está abierto
    if (changes['speciesId'] && this.isOpen && this.speciesId) {
      this.form.reset();
      this.error = null;
      this.loadSpecies();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'unset';
  }

  private loadSpecies(): void {
    this.loading = true;
    this.speciesService.findById(this.speciesId!).subscribe({
      next: (specie) => {
        this.form.patchValue({
          name: specie.name,
          powerLevel: specie.powerLevel,
          specialAbility: specie.specialAbility,
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar la especie.';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.form.value.name.trim(),
      powerLevel: +this.form.value.powerLevel,
      specialAbility: this.form.value.specialAbility.trim(),
    };

    this.saving = true;
    this.error = null;

    const request$ = this.isEditMode
      ? this.speciesService.update(this.speciesId!, payload)
      : this.speciesService.create(payload);

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.saved.emit();
        this.close.emit();
      },
      error: () => {
        this.error = this.isEditMode
          ? 'Error al actualizar la especie.'
          : 'Error al crear la especie.';
        this.saving = false;
      },
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
