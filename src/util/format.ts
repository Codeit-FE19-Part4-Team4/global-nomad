/**
 * @param {number} price 포맷팅할 금액
 * @returns {string} 천 단위 콤마가 적용된 문자열 (예: 1,234,567)
 */
export const formatPrice = (price: number) => {
  return price.toLocaleString('ko-KR');
};

/**
 * @param {number} date 포맷팅할 날짜
 * @returns {string} 년도/월/일이 합쳐진 문자열 (예: yy/mm/dd)
 */
export function formatDateYYMMDD(date: Date | undefined) {
  if (!date) return '';
  const d = date;
  if (isNaN(d.getTime())) return '';

  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  return `${yy}/${mm}/${dd}`;
}

/**
 * string 형식의 날짜(YYYY-MM-DD)를 Date 객체로 변환
 *
 * @param value 날짜 문자열 (예: "2023-12-01")
 * @returns 변환된 Date 객체, 유효하지 않으면 undefined
 */
export function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;

  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return undefined;

  return new Date(y, m - 1, d);
}

/**
 * 26/01/15 형식의 날짜를 서버에 보내기 위해 서버형식으로 변환
 * @param date 날짜 문자열
 * @returns  예: 26/01/15 → 2026-01-15
 */
export const formatToServerDate = (date: string) => {
  const [yy, mm, dd] = date.split('/');
  const year = Number(yy) < 50 ? `20${yy}` : `19${yy}`;
  return `${year}-${mm}-${dd}`;
};
