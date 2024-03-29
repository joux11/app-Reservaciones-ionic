import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoAlquilerPageRoutingModule } from './tipo-alquiler-routing.module';

import { TipoAlquilerPage } from './tipo-alquiler.page';
import { AlquilerComponent } from './alquiler/alquiler.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoAlquilerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TipoAlquilerPage, AlquilerComponent]
})
export class TipoAlquilerPageModule { }
