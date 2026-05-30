import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
        path: '',
        component: EcommerceComponent,
        pathMatch: 'full',
        title:
          'Dashboard',
      },
      {
        path: 'species',
        loadChildren: () =>
          import('./modules/species/species.module').then((m) => m.SpeciesModule),
        title: 'Gestión de Especies',
      },
      {
        path: 'battles',
        loadChildren: () =>
          import('./modules/battle/battle.module').then((m) => m.BattleModule),
        title: 'Combates',
      },
      {
        path: 'battle-statistics',
        loadChildren: () =>
          import('./modules/battle-statistics/battle-statistics.module').then((m) => m.BattleStatisticsModule),
        title: 'Battle Statistics',
      }
    ]
  },

];
