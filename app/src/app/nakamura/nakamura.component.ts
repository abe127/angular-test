import { Component, ViewChild } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTable, MatTableModule } from '@angular/material/table';
import * as moment from 'moment';


export interface PersonInfo {
  no: number;
  name: string;
  birthday: Date;
  age: number;
}

const PERSONAL_DATA: PersonInfo[] = [
  {no:0, name: 'test', birthday: new Date('1996/9/3'), age:25},
  {no:1, name: 'Hydrogen', birthday: new Date('1996/9/7'), age:25},
  {no:2, name: 'Helium', birthday: new Date('1996/11/7'), age:25},
  {no:3, name: 'Lithium', birthday: new Date('1996/12/7'), age:25},
  {no:4, name: 'Beryllium', birthday: new Date('1996/9/11'), age:25},
  {no:5, name: 'Boron', birthday: new Date('1996/9/7'), age:25},
  {no:6, name: 'Carbon', birthday: new Date('1996/9/7'), age:25},
  {no:7, name: 'Carbon', birthday: new Date('1996/8/7'), age:25},
  {no:8, name: 'Carbon', birthday: new Date('1996/9/17'), age:25},
  {no:9, name: 'Carbon', birthday: new Date('1996/9/27'), age:25}
];

@Component({
  selector: 'app-nakamura',
  templateUrl: './nakamura.component.html',
  styleUrls: ['./nakamura.component.scss']
})
export class NakamuraComponent {
  person: PersonInfo =  {no:PERSONAL_DATA.length,name: '', birthday: new Date(), age:0 };
  title = 'TestApp';
  displayedColumns: string[] = ['name','birthday','age'];
  dataSource = PERSONAL_DATA;
  @ViewChild(MatTable) table: MatTable<PersonInfo> | undefined;

  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('ja');
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    const currentDate = moment();
    const birthday = moment(event.value);
    this.person.age = currentDate.diff(birthday, 'year');
    this.person.birthday = birthday.toDate();
  }

  addPerson(){
    this.dataSource.push(this.person);
    this.table?.renderRows();
    this.initPerson();
  }

  initPerson(){
    this.person.no = this.dataSource.length;
    this.person.name = '';
    this.person.birthday = new Date();
    this.person.age = 0;
  }
}
