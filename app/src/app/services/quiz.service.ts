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
  totalQuestions: number = 0;
  totalAnswers: number = 0;

  constructor(
    private router: Router
  ) { }

  initQuiz(): void {
    this.quizzes = null;
    this.questionCount = 0;
    this.answerCount = 0;
    this.isQuizzing = false;
    const storedResult = localStorage.getItem('question-total-result');
    if(storedResult){
      JSON.parse(storedResult, (key ,value)=>{
        if(key === "totalQuestions") this.totalQuestions = value
        else if(key === "totalAnswers") this.totalAnswers = value;
      });
    }
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

  checkAnswer(choice: Choice): void {
    if (choice.isAnswer) ++this.answerCount;

    ++this.questionCount;
  }

  nextPage(): void {
    if (this.questionCount <= QUIZ_COUNT) {
      this.router.navigate(['quiz']);
    } else {
      this.router.navigate(['result']);
    }
  }

  endQuiz(): void {
    this.setResult()
    this.initQuiz();
  }

  setResult(): void{
    const storedResult = localStorage.getItem('question-total-result');
    const newResult = {
      totalQuestions : this.totalQuestions + QUIZ_COUNT,
      totalAnswers: this.totalAnswers + this.answerCount
    }

    localStorage.setItem('question-total-result', JSON.stringify(newResult));
  }
}
