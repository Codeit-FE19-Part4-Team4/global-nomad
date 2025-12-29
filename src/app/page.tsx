import ReservationForm from '@/components/ReservationForm';
import { ACTIVITY_MOCK } from '@/components/ReservationForm/mock';
import Text from '@/components/Text';
export default function TestPage() {
  return (
    <div className="space-y-4 p-10">
      <Text as="h2" className="mb-6 text-2xl font-bold">
        Global Nomad
      </Text>
      <ReservationForm
        schedules={ACTIVITY_MOCK.schedules}
        activityPrice={ACTIVITY_MOCK.price}
      />
      <div className="h-[1200px] bg-[yellow]"></div>
    </div>
  );
}
