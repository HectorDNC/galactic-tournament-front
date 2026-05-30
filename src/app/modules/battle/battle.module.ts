import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleRoutingModule } from './battle-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BattleComponent } from './pages/battle/battle.component';

@NgModule({
  declarations: [BattleComponent],
  imports: [
    CommonModule,
    BattleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BattleRoutingModule]
})
export class BattleModule {}
