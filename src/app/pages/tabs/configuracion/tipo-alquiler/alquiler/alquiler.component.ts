import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.scss'],
})
export class AlquilerComponent {

  titleHeader: string = "Nuevo Tipo de Alquiler"
  colorModal = "tertiary"
  formData: FormGroup

  verInfo: boolean = false;
  isEdit: boolean = false;

  constructor(
    private _modalController: ModalController,
    private _fb: FormBuilder,
    private _apiService: ApiService,
  ) {
    this.formData = this._fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    })

    this._apiService.getSession("accionesAlquiler").then((res: any) => {
      const acciones = JSON.parse(res)

      if (acciones) {
        if (acciones.accion === "ver") {
          this.titleHeader = "Ver Tipo de Alquiler"
          this._apiService.postData({ accion: "getTipoAlquiler", id: acciones.id }).subscribe((res: any) => {
            this.formData.setValue(res)
            this.verInfo = true
            this.colorModal = "medium"
          })
        }
        if (acciones.accion === "editar") {
          this.titleHeader = "Editar Tipo de Alquiler"
          this._apiService.postData({ accion: "getTipoAlquiler", id: acciones.id }).subscribe((res: any) => {
            this.formData.setValue(res)
            this.isEdit = true
            this.colorModal = "warning"
          })
        }
      }
    })
  }

  cancelar() {
    this._modalController.dismiss(null, 'cancel');
    this._apiService.closeSession("accionesAlquiler")
  }

  guardar() {
    if (this.formData.valid) {
      const { nombre, precio } = this.formData.value
      const body = {
        accion: "insertTipoAlquiler",
        nombre: nombre,
        precio: precio
      }
      this._apiService.postData(body).subscribe({
        next: (response: any) => {
          if (response.status) {
            this._modalController.dismiss(response.msg, 'confirm');
            this._apiService.closeSession("accionesAlquiler")

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
      const { id, nombre, precio } = this.formData.value
      const body = {
        accion: "updateTipoAlquiler",
        id: id,
        nombre: nombre,
        precio: precio
      }


      this._apiService.postData(body).subscribe({
        next: (response: any) => {
          if (response.status) {
            this._modalController.dismiss(response.msg, 'confirm');
            this._apiService.closeSession("accionesAlquiler")

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
