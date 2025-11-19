export enum GameType {
  MAZE = 'MAZE',
  DOTS = 'DOTS',
  TRIVIA = 'TRIVIA',
  COOKIES = 'COOKIES',
  RIDDLES = 'RIDDLES'
}

export interface Prophet {
  id: number;
  name: string;
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GeneratedContent {
  title: string;
  content: string;
  arabic?: string;
  translation?: string;
}

export interface Point {
  x: number;
  y: number;
  id: number;
}