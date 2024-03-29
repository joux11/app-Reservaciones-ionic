import { Component } from '@angular/core';
import { items } from './items/items';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {

  items: { nombre: string, descripcion: string, icon?: string, url?: string }[] = []
  constructor(
    private _nav: NavController,
    private _apiService: ApiService
  ) {
    this.items = items
  }


  irPagina(url: string) {
    this._nav.navigateRoot(url)
  }

  respaldar() {
    this._apiService.postData({ accion: "backup" }).subscribe((res: any) => {
      if (res.status) {
        this._apiService.showToast(res.msg)
      }
    })
  }
}
