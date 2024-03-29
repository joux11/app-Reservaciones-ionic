import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { IReservacion } from 'src/app/models/reservacion.interface';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.page.html',
  styleUrls: ['./reservacion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class ReservacionPage {

  isAdmin: boolean = false

  idReservacion: string = ""
  fechaInicio: string = "";
  horaInicio: any;
  fechaFin: string = "";
  horaFin: any;
  estado: string = "";
  selectedTipoAlquiler: any;
  precioAlquiler: string = ""
  total: string = ""


  serviciosSeleccionados: any[] = [];

  calcularDiasEntreDosFechas = function (fechaInicioStr: string, fechaFinStr: string) {

    const fechaInicio = new Date(fechaInicioStr);
    const fechaFin = new Date(fechaFinStr);

    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      return;
    }

    const diferenciaEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();

    const dias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

    return Math.round(dias + 1) || 1;
  }



  constructor(private _apiService: ApiService, private _navController: NavController) {
    this._apiService.getSession("idReservacion").then((id) => {

      this.idReservacion = id!

      const body = {
        accion: "getReservacion",
        idReservacion: id
      }
      const body2 = {
        accion: "getServiciosByReservacion",
        idReservacion: id
      }

      this._apiService.postData(body).subscribe((res: any) => {
        const reservacion: IReservacion = res.data[0]
        this.fechaInicio = reservacion.fecha_inicio
        this.fechaFin = reservacion.fecha_fin
        this.horaInicio = reservacion.hora_inicio
        this.horaFin = reservacion.hora_fin
        this.selectedTipoAlquiler = reservacion.nombre_tipo_alquiler
        this.precioAlquiler = reservacion.precio!
        this.total = reservacion.total.toString()
        this.estado = reservacion.estado

      })
      this._apiService.postData(body2).subscribe((res: any) => {
        this.serviciosSeleccionados = res.data
      })

      this._apiService.getSession("idAdmin").then((id) => {

        if (id) {
          this.isAdmin = true;
        }
      })


    })
  }
  public alertButtonsAprobacion = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {

      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        const body = {
          accion: "updateEstadoReservacion",
          idReservacion: this.idReservacion,
          estado: "Aprobada"
        }
        //console.log(body)
        this._apiService.postData(body).subscribe((res: any) => {
          if (res.status) {
            this._apiService.showToast(res.msg).then(() => {
              this._navController.back()
            })
          }
        })
      },
    },
  ];



  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {

      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        const body = {
          accion: "updateEstadoReservacion",
          idReservacion: this.idReservacion,
          estado: "Cancelada"
        }
        //console.log(body)
        this._apiService.postData(body).subscribe((res: any) => {
          if (res.status) {
            this._apiService.showToast(res.msg).then(() => {
              this._navController.back()
            })
          }
        })
      },
    },
  ];





}
