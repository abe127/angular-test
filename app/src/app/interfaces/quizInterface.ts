export interface Choice {
  statement: string;
  isAnswer: boolean;
}

export interface Quiz {
  question: string;
  choices: Choice[]
  explanation: string;
};
