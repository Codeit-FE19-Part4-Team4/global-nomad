# 디자인 시스템 - text

- 이 프로젝트의 텍스트 스타일은 Text 컴포넌트로 관리합니다.
- `Text = 시맨틱(as) + 크기(size) + 톤(variant) + 강조(className)`
- 기본은 디자인 시스템을 따르고, 필요한 순간엔 과하지 않게 벗어날 수 있도록 설계했습니다.

## 1. 스타일 구조

```txt
app/styles/
  theme.css        # 디자인 토큰 (색상, 폰트, 크기 등)
  base.css         # 시맨틱 태그 기본 스타일
  utilities.css    # 타이포 프리셋 / 텍스트 유틸리티
  layout.css       # 레이아웃 유틸리티
```

- globals.css는 Tailwind와 프로젝트 스타일을 연결하는 허브 역할만 담당합니다.
- 실제 스타일 정의는 styles/ 하위 파일에서 역할별로 관리합니다.

## 2. 핵심 원칙

- `as:` 시맨틱 (h1, p, span 등)
- `size:` 본문 크기 조절 (body 전용)
- `variant:` 텍스트 색상 톤 (의미가 있는 secondary, muted)
- `className:` 굵기 및 예외/강조 스타일
  > 요약 👉 : **시맨틱 → 크기 → 색상 → 강조 순으로 조합**

---

## 3. 사용법

```tsx
    <Text as="h1"> 32px </Text>
    <Text as="h2"> 24px </Text>
    <Text as="h3"> 20px </Text>
    <Text as="h4"> 18px </Text>
```

- body: 본문 크기 `16px` | 더 작은 본문 텍스트는 `size="body-sm (14px)`로 조절

```tsx
    <Text as="p"> 16px (기본) </Text>
    <Text as="p" size="body-sm"> 14px </Text>
```

- span (inline)

```tsx
<Text as="span"> 12px (인라인 텍스트) </Text>
```

- variant (tone)

```tsx
    <Text as="h1" variant="secondary"> 보조 텍스트 </Text>
    <Text as="p" variant="muted"> 약한 텍스트 </Text>
```

- weight: 텍스트 굵기는 `className`으로만 제어함

```tsx
    <Text as="p" className="bold"> 700 </Text>
    <Text as="p" className="regular"> 500 </Text>
    <Text as="p" className="light"> 400 </Text>
```

## 5. 컬러 사용 규칙 (중요)

- `variant`는 의미 있는 기본 텍스트 톤 (grayscale)만 담당합니다.
- 다른 컬러가 필요한 경우:
  > `variant`사용 ❌
  > `className`로 제어 ⭕

```tsx
    ⭐️⭐️⭐️
    <Text as="h1" variant="secondary"> 연한 회색 </Text>
    <Text as="h1" className="text-red-500"> 빨간색 </Text>
```

## 6. 규칙

- 시맨틱 → `as`
- 크기 → `size (본문 전용: 16px)`
- 색상 → `variant`
- 굵기 → `className`
- 임의의 `font-size`, `font-weight` 직접 지정은 지양합니다.
