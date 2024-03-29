import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDaysInMonth(year: number, month: number): Date[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray: Date[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }
    return daysArray;
  }
}
