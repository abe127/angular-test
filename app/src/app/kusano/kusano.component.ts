import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

import 'moment/locale/ja';
import KenAll from 'ken-all';


import { DialogComponent } from '../components/dialog/dialog.component';

export interface PeriodicElement {
  name: string;
  birthday: Date;
  age: number;
  zipCode: number;
  prefectures: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Helium', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Lithium', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Beryllium', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Boron', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Carbon', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Nitrogen', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Oxygen', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Fluorine', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
  {name: 'Neon', birthday: new Date(), age: 24, zipCode: 9634203, prefectures: '福島県'},
];
@Component({
  selector: 'app-kusano',
  templateUrl: './kusano.component.html',
  styleUrls: ['./kusano.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class KusanoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = ['name', 'birthday', 'age', 'zipCode', 'prefectures', 'actions'];
  public dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public modes: any = [];
  date = new FormControl(new Date());
  public editingIndex: number|null = null;


  public personData: PeriodicElement = {
    name: '',
    birthday: new Date(),
    age: 0,
    zipCode: 0,
    prefectures: ''
  }
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializationModes();
    this.dataSource.data.forEach(data => {
      data.age = this.calcAge(data.birthday);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  register(): void {
    this.dataSource.data.push(this.personData);
    this.dataSource._updateChangeSubscription();

    this.initializationModes();
  }

  getPrefectures(): void {
    if (String(this.personData.zipCode).length <= 6) {
      return;
    }
    KenAll(String(this.personData.zipCode)).then((res: any) => {
      this.personData.prefectures = res[0][0];
    });
  }

  delete(index: number): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result) {
        return;
      }
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  getAge(event: MatDatepickerInputEvent<Date>): void {
    console.log(typeof (event.value));
    if (!event.value) {
      return;
    }
    this.personData.age = this.calcAge(event.value);
  }

  calcAge(value: Date): number {
    const currentDate = moment();
    const birthday = moment(value);
    return currentDate.diff(birthday, 'year');
  }

  edit(index: number): void {
    if (this.editingIndex !== null) {
      this.modes[this.editingIndex].register = true;
      this.modes[this.editingIndex].edit = false;
    }
    this.modes[index].register = false;
    this.modes[index].edit = true;
    this.editingIndex = index;
    this.personData = this.dataSource.data[index];
  }

  save(index: number): void {
    this.modes[index].register = true;
    this.modes[index].edit = false;
    this.dataSource.data[index] = this.personData;
    this.editingIndex = null;
    this.initializationPersonData();
  }

  initializationPersonData(): void {
    this.personData = {
      name: '',
      birthday: new Date(),
      age: 0,
      zipCode: 0,
      prefectures: ''
    }
  }

  initializationModes(): void {
    this.dataSource.data.forEach(() => {
      const mode = {
        register: true,
        edit: false
      }
      this.modes.push(mode);
    });
  }
}
