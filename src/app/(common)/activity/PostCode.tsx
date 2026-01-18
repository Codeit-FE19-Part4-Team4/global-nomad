'use client';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

import Button from '@/components/Button';
import { TextInput } from '@/components/Input';
const url =
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

interface PostCodeProps {
  onChangeAddress: (address: string) => void;
  initAddress: string;
}
export default function PostCode({
  onChangeAddress,
  initAddress,
}: PostCodeProps) {
  const [baseAddress, setBaseAddress] = useState(initAddress);
  const open = useDaumPostcodePopup(url);

  const handleClickPopup = () => {
    open({
      onComplete(address) {
        setBaseAddress(address.address);
        onChangeAddress(address.address);
      },
    });
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-end gap-4">
        <TextInput
          readOnly
          label="주소"
          placeholder="주소를 입력해 주세요"
          value={baseAddress}
          onClick={handleClickPopup}
          className="cursor-pointer"
        />
        <Button
          size="lg"
          variant={'tertiary'}
          type="button"
          className="w-20 cursor-pointer"
          onClick={handleClickPopup}>
          주소 검색
        </Button>
      </div>
    </div>
  );
}
