'use client';
import { useState } from 'react';

import BasicModal from '../modal/BasicModal';
import Text from '../Text';

import ImageForm from './ImageForm';
import Preview from './Preview';

import { useModal } from '@/hooks/useModal';

interface ImageItem {
  file: File;
  id: string;
}

interface UploadImageListProps {
  children: string;
  maxImages: number;
  onUploadImage?: (newFiles: File[]) => void;
  onDeleteImage?: (file: File) => void;
  multiple?: boolean;
}

export default function UploadImageList({
  children: label,
  maxImages,
  onUploadImage,
  onDeleteImage,
  multiple = true,
}: UploadImageListProps) {
  const { openModal, closeModal } = useModal();
  const [images, setImages] = useState<ImageItem[]>([]);

  const handleAddImages = (newfiles: FileList) => {
    const filesArray = [...newfiles];
    const imagefiles = filesArray.filter((file) =>
      file.type.startsWith('image/')
    );
    if (filesArray.length !== imagefiles.length) {
      openModal({
        component: BasicModal,
        props: {
          message: '이미지 파일만 업로드 가능합니다.',
          buttonText: '확인',
          onClick: () => closeModal(BasicModal),
        },
      });
      return;
    }
    const newImage = imagefiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));
    setImages((prev) => {
      return [...prev, ...newImage];
    });
    onUploadImage?.(filesArray);
  };

  const handleDeleteImage = (selectedFile: File) => {
    setImages((prev) => {
      return prev.filter((image) => image.file !== selectedFile);
    });
    onDeleteImage?.(selectedFile);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Text as="label" size={'body-lg'} className="bold">
        {label}
      </Text>
      <div className="flex gap-3 sm:gap-[14px]">
        <ImageForm
          imgCount={images.length}
          onSelectFiles={handleAddImages}
          maxImages={maxImages}
          multiple={multiple}
        />
        <div className="flex gap-3 sm:gap-[14px]">
          {images.length > 0 &&
            images.map((image) => {
              return (
                <Preview
                  key={image.id}
                  file={image.file}
                  label={label}
                  onDelete={handleDeleteImage}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
