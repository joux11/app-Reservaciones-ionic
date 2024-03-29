import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]

})
export class PerfilPage {

  idUsuario: string = ""
  nombre: string = ""
  apellido: string = ""
  telefono: string = ""
  email: string = ""

  isAdmin: boolean = false



  constructor(private _apiService: ApiService,
    private _navController: NavController,) {

    this._apiService.getSession("idUsuario").then((id) => {
      this.idUsuario = id!
      this._apiService.postData({ accion: "getUser", idUsuario: this.idUsuario }).subscribe((res: any) => {
        if (res.status) {
          this.nombre = res.data.nombre
          this.apellido = res.data.apellido
          this.telefono = res.data.telefono
          this.email = res.data.email
        }
      })
    })

    this._apiService.getSession("idAdmin").then((id) => {
      console.log(id)
      if (id != null) {
        this.isAdmin = true;
      }
    })


  }

  logout() {
    this._apiService.clearSession().then(() => {
      this._navController.navigateRoot('')
    })
  }
  Actualizar() { }

}
