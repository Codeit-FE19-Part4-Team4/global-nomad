//마이페이지 폼 데이터 타입
export interface FormData {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

//마이페이지 폼 에러 메시지 타입
export interface FormErrors {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
