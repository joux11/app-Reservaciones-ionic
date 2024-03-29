import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionPage } from './configuracion.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPage
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosPageModule)
  },
  {
    path: 'tipo-alquiler',
    loadChildren: () => import('./tipo-alquiler/tipo-alquiler.module').then(m => m.TipoAlquilerPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionPageRoutingModule { }
