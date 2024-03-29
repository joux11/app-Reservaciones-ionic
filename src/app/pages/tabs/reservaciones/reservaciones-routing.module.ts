import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservacionesPage } from './reservaciones.page';


const routes: Routes = [
    {
        path: '',
        component: ReservacionesPage,

    },
    {
        path: 'nueva-reservacion',
        loadComponent: () => import('./nueva-reservacion/modal-nueva-reservacion.component').then(m => m.NuevaReservacionComponent)
    },
    {
        path: 'reservacion',
        loadComponent: () => import('./reservacion/reservacion.page').then(m => m.ReservacionPage)
    }




];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReservacionesPageRoutingModule { }
