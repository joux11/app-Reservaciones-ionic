import { CommonModule } from '@angular/common';
import { Component, ViewChild, viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { MatStepper } from "@angular/material/stepper";
import { MatStepperModule } from "@angular/material/stepper";

import { DateService } from 'src/app/services/date.service';
import { ApiService } from 'src/app/services/api.service';
import { IReservacion } from 'src/app/models/reservacion.interface';

import * as moment from 'moment';


@Component({
  selector: 'app-modal-nueva-reservacion',
  templateUrl: './modal-nueva-reservacion.component.html',
  styleUrls: ['./modal-nueva-reservacion.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, MatStepperModule, FormsModule]

})
export class NuevaReservacionComponent {
  meses: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' }
  ];

  UsuarioId: string = ""

  mesesFiltrador: { id: number, nombre: string }[];

  selectedMonth?: number;
  daysInMonth: Date[] = [];
  selectedDays: Date[] = []
  reservacionesDates: IReservacion[] = []
  fechaInicio: string = ""
  fechaFin: string = ""
  horaInicio: string = ""
  horaFin: string = ""


  diasReservados: number[] = []
  diasCaducados: number[] = []

  selectedTipoAlquiler: any = {}
  alquiler: any = {}
  tiposAlquiler: any[] = []


  servicios: any[] = []
  serviciosSeleccionados: any[] = []
  cantidadServicio = 1;



  @ViewChild('stepper') stepper!: MatStepper;


  constructor(
    private _dateService: DateService,
    private _apiService: ApiService,
    private _navController: NavController
  ) {
    const mesActual = new Date().getMonth() + 1;
    this.mesesFiltrador = this.meses.filter((mes) => mes.id >= mesActual);

    this._apiService.postData({ accion: "getTiposAlquiler" }).subscribe((res: any) => {
      this.tiposAlquiler = res
    })

    this._apiService.postData({ accion: "getAllServicios" }).subscribe((res: any) => {
      this.servicios = res
    })

    this._apiService.postData({ accion: "getReservaciones" }).subscribe((res: any) => {

      this.reservacionesDates = res.data
    })


    this._apiService.getSession("idUsuario").then((id) => {
      this.UsuarioId = id!
    })

  }

  generateDays() {
    if (this.selectedMonth != undefined) {



      this.diasReservados = []
      this.diasCaducados = []

      const onlydates = this.reservacionesDates.map((reservacion) => {
        return {
          fecha_inicio: reservacion.fecha_inicio,
          fecha_fin: reservacion.fecha_fin
        };
      })

      const datesReservados: { [key: number]: number[] } = {};

      onlydates.forEach((reservacion) => {
        const fechaInicio = moment(reservacion.fecha_inicio);
        const fechaFin = moment(reservacion.fecha_fin);


        const mesInicio = fechaInicio.month() + 1
        const mesFin = fechaFin.month() + 1

        for (let mes = mesInicio; mes <= mesFin; mes++) {
          const diasMes: number[] = [];


          const primerDia = mes === mesInicio ? fechaInicio.date() : 1;
          const ultimoDia = mes === mesFin ? fechaFin.date() : fechaFin.daysInMonth();


          for (let dia = primerDia; dia <= ultimoDia; dia++) {
            diasMes.push(dia);
          }

          if (!datesReservados[mes]) {
            datesReservados[mes] = [];
          }
          datesReservados[mes].push(...diasMes);
        }
      })

      if (datesReservados[this.selectedMonth]) {
        datesReservados[this.selectedMonth].forEach((dia) => {
          this.diasReservados.push(dia)
        })
      }
      this.daysInMonth = this._dateService.getDaysInMonth(new Date().getFullYear(), this.selectedMonth - 1);

      this.daysInMonth.forEach((day) => {
        if (new Date().getMonth() + 1 == this.selectedMonth) {
          if (!this.diasReservados.includes(day.getDate())) {
            if (day.getDate() <= new Date().getDate()) {
              this.diasCaducados.push(day.getDate())
            }
          }
        }
      })
    }
  }
  chunk(arr: Date[], size: number): any {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  }

  toggleDay(day: Date) {

    if (this.isCaducado(day)) {
      return;
    }
    if (this.isOcupado(day)) {
      return;
    }

    const index = this.selectedDays.findIndex(d => d.getTime() === day.getTime());

    if (index == -1) {

      let indexx = this.selectedDays.findIndex((d) => {
        return d.getDate() > day.getDate()
      })
      if (indexx == -1) {
        indexx = this.selectedDays.length
      }
      this.selectedDays.splice(indexx, 0, day);

    } else {
      this.selectedDays.splice(index, 1);
    }


    if (this.selectedDays.length > 0) {
      this.fechaInicio = this.formatDate(this.selectedDays[0]);
      this.fechaFin = this.selectedDays.length === 1 ? this.fechaInicio : this.formatDate(this.selectedDays[this.selectedDays.length - 1]);
    } else {
      this.fechaInicio = "";
      this.fechaFin = "";
    }

  }
  isSelected(day: Date) {
    return this.selectedDays.includes(day);
  }

  isOcupado(day: Date) {
    return this.diasReservados.includes(day.getDate())
  }

  isCaducado(day: Date) {
    return this.diasCaducados.includes(day.getDate())
  }

  verificarOcupado(date: Date) {
    console.log(date)
  }

  addServiciosSeleccionados(servicioId: number) {
    const servicioSeleccionado = this.servicios.find((servicio) => servicio.id == servicioId)
    if (servicioSeleccionado && !this.serviciosSeleccionados.includes(servicioSeleccionado)) {
      this.serviciosSeleccionados.push(servicioSeleccionado)
    }
  }
  deleteServicioSelecciados(servicioId: number) {
    const index = this.serviciosSeleccionados.findIndex((servicio) => servicio.id == servicioId)
    if (index != -1) {
      this.serviciosSeleccionados.splice(index, 1)
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  changeHoraInicio(event: string) {
    this.horaInicio = event ?? ""

  }
  changeHoraFin(event: string) {
    this.horaFin = event ?? ""

  }
  setAlquiler(event: number) {
    this.selectedTipoAlquiler = this.tiposAlquiler.find((tipoAlquiler) => tipoAlquiler.id == event)
  }
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

  Total = () => {
    let total = 0;
    let totalServicios = 0;
    this.serviciosSeleccionados.forEach((servicio) => {
      totalServicios += servicio.precio * servicio.cantidad
        * this.calcularDiasEntreDosFechas(this.fechaInicio, this.fechaFin)!
    });
    const costoAlquiler = this.selectedTipoAlquiler.precio * this.calcularDiasEntreDosFechas(this.fechaInicio, this.fechaFin)!
    total = totalServicios + this.selectedTipoAlquiler.precio
    return total;

  }

  guardar() {
    const body = {
      accion: "createReservacion",
      fecha_inicio: this.fechaInicio,
      hora_inicio: this.horaInicio,
      fecha_fin: this.fechaFin,
      hora_fin: this.horaFin,
      total: this.Total(),
      usuario_id: this.UsuarioId,
      tipo_alquiler_id: this.selectedTipoAlquiler.id,
      serviciosSeleccionados: this.serviciosSeleccionados

    }

    this._apiService.postData(body).subscribe((res: any) => {
      if (res.status) {
        this._apiService.showToast(res.msg).then(() => {
          this._navController.back()
        })
      }
    })
  }




}
