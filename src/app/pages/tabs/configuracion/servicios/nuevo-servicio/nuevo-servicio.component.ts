import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.scss'],
})
export class NuevoServicioComponent {

  titleHeader: string = "Nuevo Servicio"
  colorModal = "tertiary"
  formData: FormGroup

  verInfo: boolean = false;
  isEdit: boolean = false;
  constructor(
    private _modalController: ModalController,
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _nav: NavController
  ) {
    this.formData = this._fb.group({
      id: [""],
      nombre: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    })

    this._apiService.getSession("accionesServicios").then((res: any) => {
      const acciones = JSON.parse(res)
      if (acciones) {
        if (acciones.accion === "ver") {
          this.titleHeader = "Ver Servicio"
          this._apiService.postData({ accion: "getServicioById", id: acciones.id }).subscribe((res: any) => {
            this.formData.setValue(res.data)
            this.verInfo = true
            this.colorModal = "medium"
          })
        }
        if (acciones.accion === "editar") {
          this.titleHeader = "Editar Servicio"
          this._apiService.postData({ accion: "getServicioById", id: acciones.id }).subscribe((res: any) => {
            this.formData.setValue(res.data)
            this.isEdit = true
            this.colorModal = "warning"
          })
        }
      }
    })

  }

  cancelar() {
    this._modalController.dismiss(null, 'cancel');
    this._apiService.closeSession("accionesServicios")
  }

  guardar() {
    if (this.formData.valid) {
      const { nombre, detalle, precio } = this.formData.value
      const body = {
        accion: "insertServicio",
        nombre: nombre,
        detalle: detalle,
        precio: precio
      }


      this._apiService.postData(body).subscribe({
        next: (response: any) => {
          if (response.status) {
            this._modalController.dismiss(response.msg, 'confirm');
            this._apiService.closeSession("accionesServicios")

          } else {
            this._apiService.showToast(response.msg)
          }
        }
      })
    } else {
      this.formData.markAllAsTouched()
    }
  }

  editar() {
    if (this.formData.valid) {
      const { id, nombre, detalle, precio } = this.formData.value
      const body = {
        accion: "updateServicio",
        id: id,
        nombre: nombre,
        detalle: detalle,
        precio: precio
      }


      this._apiService.postData(body).subscribe({
        next: (response: any) => {
          if (response.status) {
            this._modalController.dismiss(response.msg, 'confirm');
            this._apiService.closeSession("accionesServicios")

          } else {
            this._apiService.showToast(response.msg)
          }
        }
      })
    } else {
      this.formData.markAllAsTouched()
    }
  }
}
