import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiciosPageRoutingModule } from './servicios-routing.module';

import { ServiciosPage } from './servicios.page';
import { NuevoServicioComponent } from './nuevo-servicio/nuevo-servicio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ServiciosPage, NuevoServicioComponent]
})
export class ServiciosPageModule { }
