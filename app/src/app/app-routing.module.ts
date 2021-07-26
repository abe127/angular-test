import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbeComponent } from './abe/abe.component';
import { KusanoComponent } from './kusano/kusano.component';

const routes: Routes = [
  { path: 'abe', component: AbeComponent },
  { path: 'kusano', component: KusanoComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
