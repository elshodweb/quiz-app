export interface UserInfo {
  fullName: string;
  phone: string;
  grade: string;
  language: string;
  termsAccepted: boolean;
}

export interface Question {
  text: string;
  options: string[];
  answerIndex: number;
}
