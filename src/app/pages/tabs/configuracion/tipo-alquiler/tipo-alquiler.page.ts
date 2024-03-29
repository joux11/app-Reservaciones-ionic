import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AlquilerComponent } from './alquiler/alquiler.component';

@Component({
  selector: 'app-tipo-alquiler',
  templateUrl: './tipo-alquiler.page.html',
  styleUrls: ['./tipo-alquiler.page.scss'],
})
export class TipoAlquilerPage {

  tiposAlquiler: any[] = []
  constructor(
    private _apiService: ApiService,
    private _nav: NavController,
    private _modalController: ModalController,
    private _alert: AlertController
  ) {
    this._apiService.postData({ accion: "getAllTipoAlquiler" }).subscribe((res: any) => {
      this.tiposAlquiler = res
    })
  }


  irNuevoTipo() {
    this.abrirModal()
  }

  verModal(id: string, accion: string) {
    const json = JSON.stringify({ id, accion })
    this._apiService.createSession("accionesAlquiler", json).then(() => {
      this.abrirModal()
    })
  }

  async eliminar(id: string) {
    const alert = await this._alert.create({
      header: "Eliminar Servicio",
      message: "¿Estas seguro de eliminar el Servicio?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary"
        },
        {
          text: "Eliminar",
          handler: () => {
            const body = {
              accion: "deleteTipoAlquiler",
              id: id
            }
            //console.log(body)
            this._apiService.postData(body).subscribe((res: any) => {
              if (res.status) {
                this._apiService.showToast(res.msg).then(() => {
                  this._apiService.postData({ accion: "getAllTipoAlquiler" }).subscribe((res: any) => {
                    this.tiposAlquiler = res
                  })
                })
              }
            })
          }

        }
      ]
    })
    alert.present()
  }

  async abrirModal() {
    const modal = await this._modalController.create({
      component: AlquilerComponent
    })
    modal.present()
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this._apiService.showToast(data)
      this._apiService.postData({ accion: "getAllTipoAlquiler" }).subscribe((res: any) => {
        this.tiposAlquiler = res
      })

    }
  }

}
