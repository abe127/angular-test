import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbeComponent } from './abe/abe.component';
import { KusanoComponent } from './kusano/kusano.component';
import { NakamuraComponent } from './nakamura/nakamura.component';
import { SampleComponent } from './sample/sample.component';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';
import { TestGuardGuard } from './nakamura/guard/test-guard.guard';

const routes: Routes = [
  { path: 'abe', component: AbeComponent },
  { path: 'kusano', component: KusanoComponent },
  { path: 'nakamura', component: NakamuraComponent, canDeactivate: [TestGuardGuard]},
  { path: 'sample', component: SampleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      // 現在のURLに遷移する場合もreloadするよう設定
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
