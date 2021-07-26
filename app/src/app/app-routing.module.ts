import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbeComponent } from './abe/abe.component';

const routes: Routes = [
  { path: 'abe', component: AbeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
