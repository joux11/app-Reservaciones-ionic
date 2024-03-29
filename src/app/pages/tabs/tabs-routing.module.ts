import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'perfil',
        loadComponent: () => import('./perfil/perfil.page').then(m => m.PerfilPage)
      },
      {
        path: 'reservaciones',
        loadChildren: () => import('./reservaciones/reservaciones.module').then(m => m.ReservacionesPageModule),

      },
      {
        path: 'historial',
        loadChildren: () => import('./historial/historial.module').then(m => m.HistorialModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
      },
      {
        path: '',
        redirectTo: 'reservaciones',
        pathMatch: 'full'
      }
    ]
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
