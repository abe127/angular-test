import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  quizCount!: number;
  correctCount!: number;

  constructor(
    private router: Router,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    if (this.quizService.isQuizzing) {
      this.quizCount = this.quizService.quizIndex + 1;
      this.correctCount = this.quizService.correctCount;
      this.quizService.endQuiz();
    } else {
      this.router.navigate(['home']);
    }
  }

}
