
import { Component, OnInit } from '@angular/core';

import { NavController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],

})
export class ReservacionesPage {

  reservaciones: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private _nav: NavController,
    private _modalControl: ModalController,
    private _apiService: ApiService
  ) {
    this._apiService.getSession("idUsuario").then((id) => {
      const body = {
        accion: "getReservacionesUsuario",
        idUsuario: id
      }
      this._apiService.postData(body).subscribe((res: any) => {
        if (res.status) {
          this.reservaciones = res.data
          this._apiService.createSession("reservaciones", JSON.stringify(this.reservaciones))
        }
      })
    })
    this._apiService.getSession("idAdmin").then((id) => {
      if (id) {
        this.isAdmin = true;
        this._apiService.postData({ accion: "getReservacionesByEstado" }).subscribe((res: any) => {
          this.reservaciones = res.data
        })
      }
    })
  }

  async nuevaReservacion() {
    this._nav.navigateRoot("tabs/reservaciones/nueva-reservacion")
  }
  irReservacion(id: string) {
    this._apiService.createSession("idReservacion", id).then(() => {
      this._nav.navigateRoot("tabs/reservaciones/reservacion")
    })
  }
}
