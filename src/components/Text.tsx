/**
 * 타이틀/본문 텍스트 스타일을 적용하는 Text 컴포넌트
 * className은 size/variant보다 우선 적용되고, 버튼 내부 사용은 지양합니다.
 *
 * @example
 * <Text size="title-xl">큰 제목</Text> 👈 32px 타이틀
 * <Text as="h2" size="title-lg">중간 제목</Text> 👈 h2 태그로 렌더링
 * <Text size="body-sm" variant="secondary">보조 텍스트</Text> 👈 14px 회색
 * <Text className="body-sm md:body-lg">반응형 텍스트</Text> 👈 반응형 적용
 *
 * Text 컴포넌트 사용 여부는 상황에 따라 선택할 수 있으며,
 * 텍스트 유틸리티를 className으로 직접 사용하는 것도 가능합니다.
 */

/* 어떤 HTML 태그로 렌더링할지 선택 */
export type TextAs = 'h2' | 'h3' | 'h4' | 'p' | 'span';

/* 텍스트 크기 */
export type TextSize =
  | 'title-xl'
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  | 'body-lg'
  | 'body-sm'
  | 'caption';

/* 텍스트 색상 스타일 */
export type TextVariant = 'secondary' | 'muted';

export type TextProps = {
  as?: TextAs;
  size?: TextSize;
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export default function Text({
  as: Component = 'span',
  size,
  variant,
  className,
  children,
  ...props
}: TextProps) {
  const mergedClassName = [size, variant, className].filter(Boolean).join(' ');

  return (
    <Component className={mergedClassName} {...props}>
      {children}
    </Component>
  );
}
