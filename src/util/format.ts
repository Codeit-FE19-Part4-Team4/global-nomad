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
