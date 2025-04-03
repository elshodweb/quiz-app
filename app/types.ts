export interface UserInfo {
  fullName: string;
  phone: string;
  school: string;
  grade: string;
  language: string;
  termsAccepted: boolean;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}
