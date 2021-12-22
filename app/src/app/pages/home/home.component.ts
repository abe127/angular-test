import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalCorrectCount: number = 0;
  totalQuizCount: number = 0;
  correctAnswerRate: number = 0;
  constructor(
    private router: Router,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizService.initQuizGame();
    this.totalCorrectCount = this.quizService.totalCorrectCount;
    this.totalQuizCount = this.quizService.totalQuizCount;
    this.correctAnswerRate = this.totalQuizCount > 0 ? Math.round(this.totalCorrectCount * 100 / this.totalQuizCount) : 0;
  }

  startQuiz(isConfirmAnswer: boolean) {
    this.quizService.startQuizGame(isConfirmAnswer).then(() => {
      this.router.navigate(['quiz']);
    });
  }
}
