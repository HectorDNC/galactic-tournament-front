import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingComponent } from './pages/ranking/ranking.component';

const routes: Routes = [
  {
    path: 'ranking',
    component: RankingComponent,
    title: 'Ranking de Especies',
  },
  {
    path: '',
    redirectTo: 'ranking',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleStatisticsRoutingModule { }
