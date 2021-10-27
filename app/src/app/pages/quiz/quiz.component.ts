import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quiz, Choice } from 'src/app/const/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quiz?: Quiz;
  questionCount?: number;

  constructor(
    private router: Router,
    private quizService: QuizService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if (this.quizService.isQuizzing) {
      this.quiz = this.quizService.getQuiz();
      this.questionCount = this.quizService.questionCount;
    } else {
      this.router.navigate(['home']);
    }
  }

  chooseAnswer(choice: Choice) {
    this.quizService.checkAnswer(choice);
    this.quizService.nextPage();
  }

}
