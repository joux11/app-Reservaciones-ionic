import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoAlquilerPage } from './tipo-alquiler.page';

const routes: Routes = [
  {
    path: '',
    component: TipoAlquilerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoAlquilerPageRoutingModule {}
