import Text from '@/components/Text';

export default function Page() {
  return (
    <div className="flex flex-col gap-5 pt-10">
      {/* 레이아웃 전용 헤더 */}
      <h1 className="bg-primary-500 flex h-20 items-center pl-4 text-white">
        🐿️ 레이아웃 테스트
      </h1>

      {/* title */}
      <Text as="h1">32px 다람쥐 헌 쳇바퀴에 타고파</Text>

      <Text as="h2">24px 다람쥐 헌 쳇바퀴에 타고파</Text>

      <Text as="h3">20px 다람쥐 헌 쳇바퀴에 타고파</Text>

      <Text as="h4">18px 다람쥐 헌 쳇바퀴에 타고파</Text>

      <Text as="p">16px 다람쥐 헌 쳇바퀴에 타고파</Text>

      <Text as="p" size="body-sm">
        14px 다람쥐 헌 쳇바퀴에 타고파
      </Text>

      {/* caption */}
      <Text as="span">12px 다람쥐 헌 쳇바퀴에 타고파</Text>
    </div>
  );
}
