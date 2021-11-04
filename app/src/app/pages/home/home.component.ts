import { Component, OnInit } from '@angular/core';

import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalAnswers: number = 0;
  totalQuestions: number = 0;
  correctAnswerRate: number = 0;
  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizService.initQuiz();
    this.totalAnswers = this.quizService.totalAnswers;
    this.totalQuestions = this.quizService.totalQuestions;
    this.correctAnswerRate = this.totalQuestions > 0 ? Math.round(this.totalAnswers * 100 / this.totalQuestions) : 0;
  }

  startQuiz(isConfirmAnswer:boolean) {
    this.quizService.startQuiz(isConfirmAnswer);
  }

}
