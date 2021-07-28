import { Component, ViewChild } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTable, MatTableModule } from '@angular/material/table';


export interface PersonInfo {
  name: string;
  birthday: string;
  age: number;
}

const PERSONAL_DATA: PersonInfo[] = [
  {name: 'Hydrogen', birthday:'1996/9/7', age:22},
  {name: 'Helium', birthday:'1996/9/7', age:22},
  {name: 'Lithium', birthday:'1996/9/7', age:22},
  {name: 'Beryllium', birthday:'1996/9/7', age:22},
  {name: 'Boron', birthday:'1996/9/7', age:22},
  {name: 'Carbon', birthday:'1996/9/7', age:22},
  {name: 'Nitrogen', birthday:'1996/9/7', age:22},
  {name: 'Oxygen', birthday:'1996/9/7', age:22},
  {name: 'Fluorine', birthday:'1996/9/7', age:22},
  {name: 'Neon', birthday:'1996/9/7', age:22},
];

@Component({
  selector: 'app-nakamura',
  templateUrl: './nakamura.component.html',
  styleUrls: ['./nakamura.component.scss']
})
export class NakamuraComponent {
  person: PersonInfo =  {name: '', birthday: '', age:0 };
  title = 'TestApp';
  displayedColumns: string[] = ['name','birthday','age'];
  dataSource = PERSONAL_DATA;
  @ViewChild(MatTable) table: MatTable<PersonInfo> | undefined;

  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('ja');
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    const today = new Date;
    const y1 = today.getFullYear().toString().padStart(4, '0');
    const m1 = (today.getMonth() + 1).toString().padStart(2, '0');
    const d1 = today.getDate().toString().padStart(2, '0');

    const birthday: Date = event.value == null ? new Date : event.value;
    const y2 = birthday.getFullYear().toString().padStart(4, '0');
    const m2 = (birthday.getMonth() + 1).toString().padStart(2, '0');
    const d2 = birthday.getDate().toString().padStart(2, '0');

    this.person.age = Math.floor((Number(y1 + m1 + d1) - Number(y2 + m2 + d2)) / 10000);
    this.person.birthday = birthday.toLocaleDateString();
  }
  
  addPerson(){
    this.dataSource.push(this.person);
    this.table?.renderRows();
  }
}
