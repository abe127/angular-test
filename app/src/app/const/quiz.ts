export interface Choice {
  statement: string;
  isAnswer: boolean;
}

export interface Quiz {
  question: string;
  choices: Choice[]
};

export const QUIZ_DATA: Quiz[] = [
  {
    question: '問題文',
    choices: [
      {
        statement: '選択肢1',
        isAnswer: false
      },
      {
        statement: '選択肢2(答え)',
        isAnswer: true
      },
      {
        statement: '選択肢3',
        isAnswer: false
      },
      {
        statement: '選択肢4',
        isAnswer: false
      }
    ]
  },
  {
    question: '1 + 1 = ?',
    choices: [
      {
        statement: '1',
        isAnswer: false
      },
      {
        statement: '2',
        isAnswer: true
      },
      {
        statement: '3',
        isAnswer: false
      },
      {
        statement: '4',
        isAnswer: false
      }
    ]
  },
  {
    question: '日本の首都は？',
    choices: [
      {
        statement: '東京',
        isAnswer: true
      },
      {
        statement: '京都',
        isAnswer: true
      },
      {
        statement: '名古屋',
        isAnswer: false
      },
      {
        statement: '福岡',
        isAnswer: false
      }
    ]
  }
];
