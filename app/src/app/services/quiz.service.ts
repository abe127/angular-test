import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash-es'; // https://www.npmjs.com/package/lodash-es

import { Choice, Quiz, QUIZ_DATA } from '../const/quiz';

const QUIZ_COUNT = 2;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizzes: any;
  questionCount: number = 0;
  answerCount: number = 0;
  isQuizzing: boolean = false;
  isConfirmAnswer: boolean = false;

  constructor(
    private router: Router
  ) { }

  initQuiz(): void {
    this.quizzes = null;
    this.questionCount = 0;
    this.answerCount = 0;
    this.isQuizzing = false;
  }

  startQuiz(isConfirmAnswer: boolean): void {
    this.quizzes = _.sampleSize(QUIZ_DATA, QUIZ_COUNT);
    this.questionCount = 1;
    this.answerCount = 0;
    this.isQuizzing = true;
    this.router.navigate(['quiz']);
    this.isConfirmAnswer = isConfirmAnswer;
  }

  getQuiz(): Quiz {
    return this.quizzes[this.questionCount - 1];
  }

  checkAnswer(choice: Choice): boolean {
    if (choice.isAnswer) ++this.answerCount;

    ++this.questionCount;
    return choice.isAnswer;
  }

  nextPage(): void {
    if (this.questionCount <= QUIZ_COUNT) {
      this.router.navigate(['quiz']);
    } else {
      this.router.navigate(['result']);
    }
  }

  endQuiz(): void {
    this.initQuiz();
  }
}
