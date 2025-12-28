/**
 * @param {number} price 포맷팅할 금액
 * @returns {string} 천 단위 콤마가 적용된 문자열 (예: 1,234,567)
 */
export const formatPrice = (price: number) => {
  return price.toLocaleString('ko-KR');
};
