import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialImportModule } from './material/mat-shared.module';
import { DialogComponent } from './component/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialImportModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
