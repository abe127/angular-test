export interface Choice {
  statement: string;
  isAnswer: boolean;
}

export interface Quiz {
  question: string;
  choices: Choice[]
  explanation: string;
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
    ],
    explanation: '説明文'
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
    ],
    explanation: 'https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1011667290'
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
        isAnswer: false
      },
      {
        statement: '名古屋',
        isAnswer: false
      },
      {
        statement: '福岡',
        isAnswer: false
      }
    ],
    explanation: '現在、日本の「首都」は、一般的に東京都と認識されている。日本の現行法令には「首都圏」の定義は存在するが（首都圏整備法）「首都」についての定義はなく、また過去においても「首都」という明治以前には一般的でなかった語と伝統的な用語である「都」「京」との関係について明確にされたことがなく、「日本の首都」という語そのものについて議論がある。'
  }
];
