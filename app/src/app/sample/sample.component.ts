import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  // position: number;
  // weight: number;
  // symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'sukiyaki' },
  { name: 'tempura' }
];

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  @ViewChild(MatTable) table?: MatTable<PeriodicElement>;
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;

  name = 'sushi';

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    // step1. ボタンクリックでコンソール出力
    console.log('test');

    // step2. inputのvalueをコンソール出力
    console.log(this.name);

    // step3. tableにinputのvalueを追加
    this.dataSource.push({ name: this.name });
    this.table?.renderRows();
    // データ追加時の行更新（renderRows）について
    // https://material.angular.io/components/table/overview#1-write-your-mat-table-and-provide-data
    // renderRowsのExample
    // https://material.angular.io/components/table/examples#table-dynamic-array-data
  }

}
