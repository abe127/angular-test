import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  // ※ 変数名とかはそれっぽいのをつける

  // Q1: Angularが使用している言語は？
  //

  // Q2: TypeScript（略:ts）が元にした言語は？（その言語を拡張して作られたのがts）
  //

  // tsでの型定義について
  // 変数: 型; のように型を定義する。
  name: string = '初期値'; // 初期値入れないと怒られるため型定義と同時に初期化

  // Q3: 年齢を格納するnumber型の変数を定義する。初期値は0。


  // Q4: 変数を定義するときに使用する const と let の違いは？
  // const...
  // let...

  // 配列について
  // Q5: string型の配列を定義し、hoge, fugaを格納する。1行で記述する。


  // オブジェクト（連想配列）について
  objectName = {
    key: 'value'
  };

  // Q6: key が name、value が '名無し'の person というオブジェクトを定義する。


  // Q7: ↑で作成したオブジェクトの'名無し'を自分の名前に変更する。


  // インターフェースについて
  // Q8: string型の name とnumber型の age が存在するインターフェース profile を定義する。
  // 定義場所はプログラム上部にあるimportと@Componentの間。

  // Q9: インターフェース profile を使ってオブジェクトを定義する。オブジェクト名とvalueは適当に。


  // Q10: インターフェース profile 型のオブジェクトが格納された配列を作成する。
  // ↓ヒント
  // 配列名: 型 = [
  //   {
  //     key: value
  //   }
  // ];

  constructor() { }

  ngOnInit(): void {
  }

  // メソッドについて
  // Q11: 引数で受け取ったnumber型の age の後ろに 歳 をつけて返す formatAge メソッドを作成する。
  //    戻り値の型も定義すること。
  displayAge: string = this.formatAge(20); // こんな感じで使いたい



}
