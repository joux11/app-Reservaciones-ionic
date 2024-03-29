import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = "http://localhost/reservacionesapi/api/ws_reservaciones";

  constructor(
    private _http: HttpClient,
    private toastCtrl: ToastController


  ) { }

  postData(body: any) {
    let head = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: head
    }

    return this._http.post(this.API_URL, JSON.stringify(body), options)
  }

  async createSession(id: string, valor: string) {
    await Preferences.set({
      key: id,
      value: valor
    })
  }


  async closeSession(id: string) {
    await Preferences.remove({ key: id })
  }
  async clearSession() {
    await Preferences.clear()
  }

  async getSession(id: string) {
    const item = await Preferences.get({ key: id });
    return item.value
  }

  public async showToast(
    message: string
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
