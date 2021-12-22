import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash-es'; // https://www.npmjs.com/package/lodash-es

import { Choice, Quiz } from 'src/app/interfaces/quizInterface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const QUIZ_COUNT = 2;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // 出題する問題を格納する変数
  private _quizzes: Quiz[] = [];
  // 出題数、正答数、総出題数、総正答数
  private _quizIndex: number = 0;
  private _correctCount: number = 0;
  private _totalQuizCount: number = 0;
  private _totalCorrectCount: number = 0;
  // クイズを実行中かどうかのフラグ値
  private _isQuizzing: boolean = false;
  // 回答後に正否確認をするかどうかのフラグ値
  private _isConfirmAnswer: boolean = false;

  constructor(private router: Router, private firestore: AngularFirestore) {}

  // homeのngOnInitから実行される
  // 出題する問題やカウントの初期化、フラグの初期化
  initQuizGame(): void {
    this._quizzes = [];
    this._quizIndex = 0;
    this._correctCount = 0;
    this._isQuizzing = false;
    // ローカルストレージから過去の総出題数、総正答数を取得
    const storedResult = localStorage.getItem('question-total-result') ?? false;
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      this._totalQuizCount = parsedResult.totalQuizCount ?? 0;
      this._totalCorrectCount = parsedResult.totalCorrectCount ?? 0;
    }
  }

  // homeの「クイズスタート」ボタンから実行される
  // これから出題する問題の取得、出題数、正答数を初期化
  async startQuizGame(isConfirmAnswer: boolean) {
    await this.getData().then((data: Quiz[]) => {
      this._quizzes = data;
      this._quizIndex = 0;
      this._correctCount = 0;
      this._isQuizzing = true;
      this._isConfirmAnswer = isConfirmAnswer;
    });
  }

  getData(): Promise<Quiz[]> {
    return new Promise((resolve, reject) => {
      const quizCollection = this.firestore.collection<Quiz>('quizzes');
      quizCollection.valueChanges().subscribe((quizzes) => {
        resolve(_.sampleSize(quizzes, QUIZ_COUNT));
      });
    });
  }

  getQuiz(): Quiz {
    return this._quizzes[this._quizIndex];
  }

  checkAnswer(choice: Choice): void {
    if (choice.isAnswer) ++this._correctCount;
    ++this._quizIndex;
    this.nextPage();
  }

  nextPage(): void {
    if (this._quizIndex < QUIZ_COUNT) {
      this.router.navigate(['quiz']);
    } else {
      this.router.navigate(['result']);
    }
  }

  endQuiz(): void {
    this.setResult();
    this.initQuizGame();
  }

  // 総出題数、総正答数を更新してローカルストレージへ保存
  setResult(): void {
    const newResult = {
      totalQuizCount: this._totalQuizCount + QUIZ_COUNT,
      totalCorrectCount: this._totalCorrectCount + this._correctCount,
    };
    localStorage.setItem('question-total-result', JSON.stringify(newResult));
  }

  // 上記で宣言したprivateな変数のgetter
  get quizIndex(): number {
    return this._quizIndex;
  }
  get correctCount(): number {
    return this._correctCount;
  }
  get isQuizzing(): boolean {
    return this._isQuizzing;
  }
  get isConfirmAnswer(): boolean {
    return this._isConfirmAnswer;
  }
  get totalQuizCount(): number {
    return this._totalQuizCount;
  }
  get totalCorrectCount(): number {
    return this._totalCorrectCount;
  }
}
