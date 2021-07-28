import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbeComponent } from './abe/abe.component';
import { KusanoComponent } from './kusano/kusano.component';
import { NakamuraComponent } from './nakamura/nakamura.component';
import { SampleComponent } from './sample/sample.component';

const routes: Routes = [
  { path: 'abe', component: AbeComponent },
  { path: 'kusano', component: KusanoComponent },
  { path: 'nakamura', component: NakamuraComponent },
  { path: 'sample', component: SampleComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
