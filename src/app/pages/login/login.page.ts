import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ModalRegisterComponent } from './modal-register/modal-register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formData: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _navController: NavController,
    private _modalControl: ModalController
  ) {
    this.formData = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    if (this.formData.valid) {
      const { email, password } = this.formData.value
      const body = {
        accion: "login",
        email: email,
        password: password
      }


      this._apiService.postData(body).subscribe({
        next: (response: any) => {
          if (response.status) {

            const { id, rol_id } = response.data
            console.log(rol_id)
            if (rol_id === 1) {
              this._apiService.createSession("idAdmin", rol_id)
            }
            this._apiService.createSession("idUsuario", id).then(() => {
              this._navController.navigateRoot('tabs')
            })

          } else {
            this._apiService.showToast(response.msg)
          }
        }
      })
    } else {
      this.formData.markAllAsTouched()
    }

  }

  async signup() {
    const modal = await this._modalControl.create({
      component: ModalRegisterComponent,
    })
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this._apiService.showToast(data)
    }
    if (role === "cancel") {

    }

  }

}
