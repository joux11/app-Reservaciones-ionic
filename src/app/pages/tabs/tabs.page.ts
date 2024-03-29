import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { isEmpty } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  isAdmin: boolean = false

  constructor(private _apiService: ApiService,
    private _navController: NavController,) {
    this._apiService.getSession("idUsuario").then((id) => {
      if (!id) {
        this._navController.navigateRoot('')
      }
    })
    this._apiService.getSession("idAdmin").then((id) => {
      if (id) {
        this.isAdmin = true;
      }
    })
  }



}
