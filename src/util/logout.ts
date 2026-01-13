//로그아웃
export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
