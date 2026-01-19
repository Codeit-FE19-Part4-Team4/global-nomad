# 🌍 GlobalNomad

**GlobalNomad**는  
판매자(호스트)와 체험자(게스트) 역할을 모두 수행할 수 있는 **체험 예약 플랫폼**입니다.  
호스트는 체험과 예약 일정을 관리하고, 사용자는 체험 탐색·예약·리뷰를 할 수 있습니다.

OAuth 인증과 외부 SDK 연동을 통해 실제 서비스 흐름을 고려한 기능을 구현했습니다.

## 📌 프로젝트 개요

- **프로젝트 기간**: 2025.12.18 ~ 2026.01.18 (약 1개월)
- **프로젝트 유형**: 프론트엔드 팀 프로젝트
- **참여 인원**: 4명
  - [양은지](https://github.com/eunji0124)
  - [이나래](https://github.com/jerryko570)
  - [이선영](https://github.com/sylee86)
  - [현유진](https://github.com/yujin-fe)

## 🚀 기술 스택

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery)

> TailwindCSS 유틸 관리:  
> `clsx`, `cva`, `tw-merge`, `cn` 활용

---

### Data & API

![Fetch API](https://img.shields.io/badge/Fetch%20API-native-lightgrey)
![Kakao Maps SDK](https://img.shields.io/badge/Kakao%20Maps%20SDK-FFCD00?logo=kakao)

---

### Authentication

![OAuth](https://img.shields.io/badge/OAuth-2.0-green?logo=auth0)

---

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)

---

### Code Quality & Tooling

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier)
![Husky](https://img.shields.io/badge/Husky-Git%20Hooks-black)
![GitHub Flow](https://img.shields.io/badge/GitHub-Flow-181717?logo=github)

## 페이지별 기능

### 메인페이지

```
등록된 모든 체험의 조회가 가능하고, 검색, 필터링 기능을 제공합니다.
```

| Desktop                                    | Mobile                                     |
| ------------------------------------------ | ------------------------------------------ |
| <img src="docs/main-pc.png" width="400" /> | <img src="docs/main-mb.png" width="180" /> |

### 체험 상세 페이지

```
체험의 상세 정보를 확인할 수 있으며, 체험 관리자는 체험을 수정·삭제할 수 있습니다.

일반 사용자는 예약 가능한 날짜와 시간을 선택해 체험을 예약할 수 있습니다.

체험 주소는 Kakao Maps SDK를 연동하여 지도에서 확인할 수 있습니다.
```

| Desktop                                      | Mobile                                       |
| -------------------------------------------- | -------------------------------------------- |
| <img src="docs/detail-pc.png" width="400" /> | <img src="docs/detail-mb.png" width="200" /> |

### 내 정보

```
프로필 이미지, 닉네임, 비밀번호 수정이 가능합니다.
```

| Desktop                                      | Mobile                                       |
| -------------------------------------------- | -------------------------------------------- |
| <img src="docs/mypage-pc.png" width="400" /> | <img src="docs/mypage-mb.png" width="200" /> |

### 내 예약 내역

```
유저가 예약한 예약 내역을 리스트로 조회 가능하고, 예약 상태별 필터링이 가능합니다.
예약된 체험을 취소할 수 있습니다.
예약이 완료된 체험에는 후기를 남길 수 있습니다.
```

| Desktop                                             | Mobile                                              |
| --------------------------------------------------- | --------------------------------------------------- |
| <img src="docs/myreservation-pc.png" width="400" /> | <img src="docs/myreservation-mb.png" width="200" /> |

### 체험 관리

```
유저가 등록한 체험을 조회가능하며 체험 등록, 수정, 삭제가 가능합니다.
```

| Desktop                                            | Mobile                                             |
| -------------------------------------------------- | -------------------------------------------------- |
| <img src="docs/myactivities-pc.png" width="400" /> | <img src="docs/myactivities-mb.png" width="200" /> |

### 체험 예약 현황

```
등록한 체험에 대한 예약 현황을 체험별로 확인할 수 있으며, 신청된 예약을 승인, 거절 할 수 있습니다.
```

| Desktop                                                         | Mobile                                                          |
| --------------------------------------------------------------- | --------------------------------------------------------------- |
| <img src="docs/myactivities-reservations-pc.png" width="400" /> | <img src="docs/myactivities-reservations-mb.png" width="200" /> |
