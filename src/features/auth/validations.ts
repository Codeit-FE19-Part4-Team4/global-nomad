export const validateEmail = (email: string) => {
  if (!email) return '';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? '' : '이메일 형식으로 작성해 주세요.';
};

export const validatePassword = (password: string) => {
  if (!password) return '';
  return password.length >= 8 ? '' : '8자 이상 작성해 주세요.';
};

export const validatePasswordConfirm = (password: string, confirm: string) => {
  if (!confirm) return '';
  return password === confirm ? '' : '비밀번호가 일치하지 않습니다.';
};
