import ReservationManagementCalendar from '@/components/reservation-management/ReservationManagementCalendar';
import Text from '@/components/Text';
export default function TestPage() {
  return (
    <div className="space-y-4 p-10">
      <Text as="h2" className="mb-6 text-2xl font-bold">
        Global Nomad
      </Text>
      <ReservationManagementCalendar />
    </div>
  );
}
