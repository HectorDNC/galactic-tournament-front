import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmación';
  @Input() message = '¿Estás seguro?';
  @Input() confirmText = 'Aceptar';
  @Input() cancelText = 'Cancelar';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
