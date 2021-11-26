import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quiz, Choice, QUIZ_DATA} from 'src/app/const/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash-es'; // https://www.npmjs.com/package/lodash-es
import { doc, addDoc, collection } from "firebase/firestore";
import { getFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quiz?: Quiz;
  questionCount?: number;
  db?:any;



  constructor(
    private router: Router,
    private quizService: QuizService,
    public dialog: MatDialog,
    ) {
    // 同一ルートへ遷移する場合shouldReuseRouteにはtrueが入るため強制的にfalse設定する
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.db = getFirestore();
  }

  ngOnInit(): void {
    if (this.quizService.isQuizzing) {
      this.quiz = this.quizService.getQuiz();
      this.quiz.choices = _.shuffle(this.quiz.choices);
      this.questionCount = this.quizService.questionCount;
    } else {
      this.router.navigate(['home']);
    }
  }

  addDoc(): void {
    QUIZ_DATA.forEach( q => {
      const docRef = addDoc(collection(this.db, "quizzes"), q);
      console.log(docRef)
    })

  }

  chooseAnswer(choice: Choice) {
    if(this.quizService.isConfirmAnswer){
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
      });
    }else{
      this.quizService.checkAnswer(choice);
    }
  }

}
