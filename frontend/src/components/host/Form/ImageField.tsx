import { useCallback, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '@type/hostInfo';
import { convertToBase64 } from '@utils/convertToBase64';
import {
  FileInput,
  FileInputLabel,
  FormCell,
  ImageActionButtons,
  ImageButton,
  ImageContainer,
  ImageUpload,
  Label,
  PlaceholderImage,
  PreviewImage,
  UploadIcon,
  UploadText
} from './style';

export default function ImageField() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, setValue } = useFormContext<FormValues>();
  const previewImage = useWatch({
    control,
    name: 'previewImage',
    defaultValue: null
  });

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const files = e.target.files;
      if (!files) return;

      const base64 = await convertToBase64(files[0]);
      setValue('previewImage', base64);
    },
    [setValue]
  );

  const handleImageDelete = useCallback(() => {
    setValue('previewImage', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setValue]);

  return (
    <FormCell>
      <Label>미리보기 이미지</Label>
      <ImageUpload>
        {previewImage ? (
          <ImageContainer>
            <PreviewImage src={previewImage} alt="미리보기 이미지" />
            <ImageActionButtons>
              <ImageButton as="label" htmlFor="preview-image-input">
                수정
              </ImageButton>
              <ImageButton onClick={handleImageDelete} type="button">
                삭제
              </ImageButton>
            </ImageActionButtons>
          </ImageContainer>
        ) : (
          <FileInputLabel htmlFor="preview-image-input">
            <PlaceholderImage>
              <UploadIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13" stroke="#AEB4C2" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 1L7 13" stroke="#AEB4C2" strokeWidth="1.5" strokeLinecap="round" />
              </UploadIcon>
              <UploadText>업로드 (1280x720)</UploadText>
            </PlaceholderImage>
          </FileInputLabel>
        )}
        <FileInput
          ref={fileInputRef}
          id="preview-image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </ImageUpload>
    </FormCell>
  );
}
