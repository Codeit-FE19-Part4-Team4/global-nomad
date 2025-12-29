# 모달 사용 가이드

## 페이지에서 모달 추가하기

### 1단계: useModal 훅 가져오기

`useModal` 훅을 사용하여 `openModal`과 `closeModal` 함수를 가져옵니다.

```tsx
const { openModal, closeModal } = useModal();
```

### 2단계: 모달 트리거 설정

모달을 열고자 하는 이벤트 핸들러에서 `openModal` 함수를 호출합니다.

#### 파라미터

- **`component`**: 열고자 하는 모달 컴포넌트
- **`props`**: 모달 컴포넌트에 전달할 props 객체

#### 사용 예시

```tsx
<button
  onClick={() =>
    openModal({
      component: CancelModal,
      props: {
        message: '예약을 취소하시겠습니까?',
        rightBtnText: '취소하기',
        onConfirmDelete: handleDelete, // 삭제 API 연동 함수
      },
    })
  }>
  모달 열기
</button>
```

---

## 주의사항

- `props`는 모달 컴포넌트가 요구하는 인터페이스에 맞게 전달해야 합니다. (컴포넌트에 마우스를 대서 확인하세요.)
