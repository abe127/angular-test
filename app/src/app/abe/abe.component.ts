import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', },
  { name: 'Helium', },
];

@Component({
  selector: 'app-abe',
  templateUrl: './abe.component.html',
  styleUrls: ['./abe.component.scss']
})
export class AbeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  profileForm = new FormGroup({
    name: new FormControl('')
  });

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.paginator != null) this.dataSource.paginator = this.paginator;
  }

  onSubmit() {
    this.dataSource.data.push(this.profileForm.value);
    this.dataSource._updateChangeSubscription();

    this.profileForm.reset();
  }

}
