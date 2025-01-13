import { Controller, useFormContext } from 'react-hook-form';
import { FormValues } from '@type/hostInfo';
import { FormCell, Input, Label } from './style';

export default function NoticeField() {
  const { control } = useFormContext<FormValues>();

  return (
    <FormCell>
      <Label>공지</Label>
      <Controller
        name="notice"
        control={control}
        render={({ field }) => <Input {...field} type="text" placeholder="공지 추가하기" />}
      />
    </FormCell>
  );
}
