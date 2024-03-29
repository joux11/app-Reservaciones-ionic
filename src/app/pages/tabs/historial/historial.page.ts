import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { IReservacion } from 'src/app/models/reservacion.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],

})
export class HistorialPage implements ViewWillEnter {
  reservaciones: IReservacion[] = [];

  constructor(private _apiService: ApiService) {

  }
  ionViewWillEnter(): void {
    this._apiService.getSession("idUsuario").then((id) => {
      this._apiService.postData({ accion: "getCanceladasReservaciones", idUsuario: id }).subscribe((res: any) => {
        this.reservaciones = res.data;

      })
    })
  }




}
