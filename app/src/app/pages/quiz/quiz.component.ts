import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quiz, Choice } from 'src/app/interfaces/quizInterface';
import { QuizService } from 'src/app/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash-es'; // https://www.npmjs.com/package/lodash-es


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quiz!: Quiz;
  quizCount!: number;

  constructor(
    private router: Router,
    private quizService: QuizService,
    public dialog: MatDialog,
    ) {
    // 同一ルートへ遷移する場合shouldReuseRouteにはtrueが入るため強制的にfalse設定する
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if (this.quizService.isQuizzing) {
      this.quiz = this.quizService.getQuiz();
      this.quiz.choices = _.shuffle(this.quiz.choices);
      this.quizCount = this.quizService.quizIndex + 1;
    } else {
      this.router.navigate(['home']);
    }
  }

  chooseAnswer(choice: Choice) {
    if (this.quizService.isConfirmAnswer) {
      const dialogData = {
        isCorrect: choice.isAnswer,
        explanation: this.quiz?.explanation,
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent,{
        width: '60vw',
        data: dialogData,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(() => {
        this.quizService.checkAnswer(choice);
        this.quizService.nextPage();
      });
    } else {
      this.quizService.checkAnswer(choice);
      this.quizService.nextPage();
    }
  }

}
