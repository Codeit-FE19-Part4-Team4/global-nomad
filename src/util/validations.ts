export const validateEmail = (email: string) => {
  if (!email) return '';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? '' : '이메일 형식으로 작성해 주세요.';
};

export const validateNickname = (nickname: string) => {
  if (!nickname) return '';
  if (nickname.length < 2) return '닉네임은 최소 2자 이상이어야 합니다.';
  if (nickname.length > 10) return '닉네임은 최대 10자 이하로 작성해주세요.';
  return '';
};

export const validatePassword = (password: string) => {
  if (!password) return '';
  return password.length >= 8 ? '' : '8자 이상 작성해 주세요.';
};

export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
) => {
  if (!passwordConfirm) return '';
  return password === passwordConfirm ? '' : '비밀번호가 일치하지 않습니다.';
};
