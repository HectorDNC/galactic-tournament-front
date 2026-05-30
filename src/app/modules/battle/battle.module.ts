import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleRoutingModule } from './battle-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BattleComponent } from './pages/battle/battle.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { ConfirmComponent } from '../../shared/components/ui/confirm/confirm.component';

@NgModule({
  declarations: [BattleComponent],
  imports: [
    CommonModule,
    BattleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    ConfirmComponent,
  ],
  exports: [BattleRoutingModule]
})
export class BattleModule {}
