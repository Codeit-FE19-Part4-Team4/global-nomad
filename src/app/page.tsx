import EmptyState from '@/components/EmptyState';
import Text from '@/components/Text';

export default function TestPage() {
  return (
    <>
      <div className="space-y-4 p-10">
        <Text as="h2" className="mb-6 text-2xl font-bold">
          Global Nomad
        </Text>

        <EmptyState
          description="아직 등록한 체험이 없어요."
          buttonText="체험 등록하기"
          buttonHref="/experiences"
        />
      </div>
    </>
  );
}
