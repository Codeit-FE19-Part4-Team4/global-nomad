/* 어떤 HTML 태그로 렌더링할지 선택 (h1, h2, p, span) */
export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

/* 텍스트 크기 (현재는 body-sm(14px)만 옵션 사용) */
export type TextSize = 'body-sm';

/* 텍스트 색상 스타일 (grayscale 한정 흐리게, 보조 색상 등) */
export type TextVariant = 'secondary' | 'muted';

export type TextProps = {
  as?: TextAs; // 기본값: span
  size?: TextSize; // 텍스트 크기 (body 전용)
  variant?: TextVariant; // 색상 스타일
  className?: string; // 굵기, grayscale 외 컬러, 추가 CSS 클래스
  children: React.ReactNode; // 텍스트 내용 (태그 사이에 들어갈 것)
} & React.HTMLAttributes<HTMLElement>; // onClick 같은 HTML 속성 사용 가능

export default function Text({
  as: Component = 'span',
  size,
  variant,
  className,
  children,
  ...props
}: TextProps) {
  // undefined가 포함되지 않도록, 유효한 클래스만 모아서 className으로 사용
  const mergedClassName = [size, variant, className].filter(Boolean).join(' ');
  return (
    <Component className={mergedClassName} {...props}>
      {children}
    </Component>
  );
}
