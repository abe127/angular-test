import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash-es'; // https://www.npmjs.com/package/lodash-es

import { Choice, Quiz, QUIZ_DATA } from '../const/quiz';

const QUIZ_COUNT = 2;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private _quizzes: any;
  private _questionCount: number = 0;
  private _answerCount: number = 0;
  private _isQuizzing: boolean = false;
  private _isConfirmAnswer: boolean = false;
  private _totalQuestions: number = 0;
  private _totalAnswers: number = 0;

  constructor(
    private router: Router
  ) { }

  initQuiz(): void {
    this._quizzes = null;
    this._questionCount = 0;
    this._answerCount = 0;
    this._isQuizzing = false;
    const storedResult = localStorage.getItem('question-total-result');
    if(storedResult){
      JSON.parse(storedResult, (key ,value)=>{
        if(key === "totalQuestions") this._totalQuestions = value
        else if(key === "totalAnswers") this._totalAnswers = value;
      });
    }
  }

  startQuiz(isConfirmAnswer: boolean): void {
    this._quizzes = _.sampleSize(QUIZ_DATA, QUIZ_COUNT);
    this._questionCount = 1;
    this._answerCount = 0;
    this._isQuizzing = true;
    this.router.navigate(['quiz']);
    this._isConfirmAnswer = isConfirmAnswer;
  }

  getQuiz(): Quiz {
    return this._quizzes[this.questionCount - 1];
  }

  checkAnswer(choice: Choice): void {
    if (choice.isAnswer) ++this._answerCount;

    ++this._questionCount;
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

  get questionCount(): number{
    return this._questionCount;
  }
  get answerCount(): number{
    return this._answerCount;
  }
  get isQuizzing(): boolean{
    return this._isQuizzing;
  }
  get isConfirmAnswer(): boolean{
    return this._isConfirmAnswer;
  }
  get totalQuestions(): number{
    return this._totalQuestions;
  }
  get totalAnswers(): number{
    return this._totalAnswers;
  }

}
