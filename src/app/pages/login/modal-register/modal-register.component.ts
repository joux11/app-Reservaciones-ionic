import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss'],
})
export class ModalRegisterComponent {
  formData: FormGroup;

  constructor(
    private _modalCotnroller: ModalController,
    private _fb: FormBuilder,
    private _apiService: ApiService,
  ) {
    this.formData = this._fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    })
  }

  signup() {
    if (this.formData.valid) {
      const { email, password, nombre, apellido, telefono } = this.formData.value
      const body = {
        accion: "register",
        email: email,
        password: password,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono

      }


      this._apiService.postData(body).subscribe({
        next: (response: any) => {
          if (response.status) {

            this._modalCotnroller.dismiss(response.msg, 'confirm');
          } else {
            this._apiService.showToast(response.msg)
          }
        }
      })
    } else {
      this.formData.markAllAsTouched()
    }
  }


  cancel() {
    this._modalCotnroller.dismiss(null, 'cancel');
  }

  confirm() {
    this._modalCotnroller.dismiss(null, 'confirm');
  }

}
