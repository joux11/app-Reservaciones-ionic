import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistorialPage } from './historial.page';
import { HistorialPageRoutingModule } from './historial-routing.module';



@NgModule({
  declarations: [HistorialPage],
  imports: [
    CommonModule,
    IonicModule, CommonModule, ReactiveFormsModule,
    HistorialPageRoutingModule
  ],


})
export class HistorialModule { }
