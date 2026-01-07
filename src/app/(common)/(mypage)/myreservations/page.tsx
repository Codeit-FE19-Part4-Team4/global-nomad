import PageHeader from '../components/PageHeader';

import ReservationClient from './components/ReservationClient';

export default function MyReservationsPage() {
  return (
    <section>
      <header>
        <PageHeader
          title="내 예약내역"
          description="예약내역 변경 및 취소할 수 있습니다."
        />
      </header>

      {/* 데이터 패칭 및 로딩/에러 관리는 클라이언트 컴포넌트에서 */}
      <ReservationClient />
    </section>
  );
}
