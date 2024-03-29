import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReservacionesPage } from './reservaciones.page';

import { ReservacionesPageRoutingModule } from './reservaciones-routing.module';




@NgModule({
  declarations: [ReservacionesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservacionesPageRoutingModule,

  ]
})
export class ReservacionesPageModule { }
