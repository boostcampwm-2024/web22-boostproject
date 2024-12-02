import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import useUpdateHost from '@queries/host/useUpdateHost';
import { getStoredId } from '@utils/id';
import { CategoryField, HostNameField, ImageField, LiveTitleField, NoticeField, TagField } from './Form';
import { Button } from './Form/style';
import { FormValues } from '@type/hostInfo';

export default function SettingForm() {
  const { mutate: updateHost } = useUpdateHost();
  const methods = useForm<FormValues>({
    defaultValues: {
      liveTitle: '',
      category: '',
      tag: '',
      tags: [],
      notice: '',
      previewImage: null
    }
  });

  const onSubmit = ({ liveTitle, category, previewImage, tags, hostName, notice }: FormValues) => {
    updateHost({
      userId: getStoredId(),
      liveTitle,
      category,
      hostName,
      notice,
      defaultThumbnailImageUrl: previewImage || '',
      tags
    });
  };

  return (
    <FormProvider {...methods}>
      <Container>
        <FormArea onSubmit={methods.handleSubmit(onSubmit)}>
          <LiveTitleField />
          <HostNameField />
          <CategoryField />
          <TagField />
          <NoticeField />
          <ImageField />
          <Button type="submit">업데이트</Button>
        </FormArea>
      </Container>
    </FormProvider>
  );
}

const Container = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormArea = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
