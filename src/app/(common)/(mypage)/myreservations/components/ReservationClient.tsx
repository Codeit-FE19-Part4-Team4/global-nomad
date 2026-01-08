'use client';

import { MOCK_RESERVATIONS } from '../mock';

import ReservationList from './ReservationList';

/**
 * 예약 목록에 사용할 데이터를 준비해서
 * ReservationList(UI 컴포넌트)에 전달하는 컴포넌트입니다.
 * 현재는 API 대신 목업 데이터를 사용합니다.
 */
export default function ReservationClient() {
  return <ReservationList reservationList={MOCK_RESERVATIONS} />;
}
