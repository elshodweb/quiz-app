export interface UserInfo {
  fullName: string;
  phone: string;
  grade: string;
  language: string;
}

export interface Question {
  text: string;
  options: string[];
  answerIndex: number;
}

export interface TestInfo {
  subject: string;
  grade: string;
  language: string;
  questions: Question[];
}
